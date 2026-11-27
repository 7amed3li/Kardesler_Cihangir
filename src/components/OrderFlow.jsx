"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";
import PortionSelector from "./PortionSelector";
import { useMounted } from "../hooks/useMounted";
import Image from "next/image";
import { ClipboardList, X, Plus, Minus, Trash2, MessageCircle, Check, CheckCircle, MapPin, ChevronDown, ChevronUp, Phone, LocateFixed, Loader2, Search } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { buildWhatsAppOrderUrl } from "../lib/whatsappOrder";
import { PORTION_LABELS_TR } from "../lib/portions";
import { MAHALLELER } from "../lib/mahalleler";
import { trackEvent } from "../lib/trackingUtils";

// Accuracy-gated position capture — shared by the address autofill and
// the "add my location to the order" opt-in. A one-shot
// getCurrentPosition returns the fastest fix, which without high
// accuracy requested is often a Wi-Fi/cell position 100-500 m off:
// wider than a whole mahalle in Beyoğlu, and it silently filled the
// wrong neighbourhood (Kuloğlu for a customer in Cihangir). Instead we
// WATCH fixes with high accuracy requested and no cached values, keep
// the best fix seen, stop as soon as one is good enough (<= 30 m),
// and give up at 15 s with the best fix seen. Resolves null when no
// fix arrives at all (denied / unavailable) — callers treat that as
// "no location", never as an error worth blocking on. The resolved
// fix carries its accuracy radius so callers can gate on it.
function captureAccuratePosition() {
  return new Promise((resolve) => {
    if (!("geolocation" in navigator)) {
      resolve(null);
      return;
    }
    let best = null;
    let settled = false;
    let watchId = null;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      if (watchId !== null) {
        try {
          navigator.geolocation.clearWatch(watchId);
        } catch {}
      }
      resolve(value);
    };
    const startedAt = Date.now();
    try {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const fix = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          };
          if (!best || fix.accuracy < best.accuracy) best = fix;
          if (fix.accuracy <= 30) finish(fix);
          else if (Date.now() - startedAt >= 15000) finish(best);
        },
        // Denied / unavailable: if a usable fix already arrived, keep
        // it; otherwise resolve null (the caller's "failed" path).
        () => finish(best),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 15000 }
      );
    } catch {
      resolve(null);
      return;
    }
    // Hard stop: some browsers never call back on a stalled watch.
    setTimeout(() => finish(best), 15500);
  });
}

// Turkish-aware fold for the mahalle picker search. A plain
// toLowerCase breaks Turkish: "İ".toLowerCase() yields "i̇" (i +
// combining dot) and "I" yields "ı", so "istiklal" would never match
// "İstiklal". Locale lowercase (İ→i̇, I→ı), then stripping the
// combining dot and folding ı→i, makes matching symmetric: "istiklal"
// finds "İstiklal", "ISTIKLAL" finds it too, and "kadi" finds
// "Kadımehmet Efendi". The remaining Turkish diacritics fold to
// their ASCII base letters on BOTH sides, so a foreign customer
// typing "kuloglu" or "sutluce" still finds "Kuloğlu" / "Sütlüce" —
// exact Turkish typing is unaffected (the fold is symmetric).
const MAHALLE_FOLD_MAP = { "ı": "i", "ğ": "g", "ş": "s", "ç": "c", "ö": "o", "ü": "u" };
function foldMahalleSearch(s) {
  return (s || "")
    .toLocaleLowerCase("tr-TR")
    .replace(/\u0307/g, "")
    .replace(/[ığşçöü]/g, (ch) => MAHALLE_FOLD_MAP[ch]);
}

export default function OrderFlow() {
  const {
    t,
    menuT,
    lang,
    cart,
    cartCount,
    cartTotal,
    cartPulse,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    clearCart,
    submitOrder,
    orderStatus,
    convertPrice,
    getCurrencySymbol,
    getLivePrice,
    getPortionUnitPrice,
    changeCartLinePortion,
    pricesLoading,
    pricesError,
  } = useAppContext();

  // Portion labels inside the cart are ALWAYS Turkish (owner ruling
  // 2026-11-26: portions are kitchen language) — the item badge, the
  // portion chips and the WhatsApp order message all read from this
  // locale-independent source, never from the active locale.
  const portionLabels = PORTION_LABELS_TR;

  const symbol = getCurrencySymbol();
  const labels = t.orderFlow || {};
  const wa = t.whatsappOrder || {};

  // Payment method for delivery orders: "cash" (default) or "card", both
  // paid at the door. Persisted next to the cart (kardesler_cart) so the
  // choice survives reloads, and read at order time into the WhatsApp
  // message so the restaurant knows whether to send the card terminal.
  const PAYMENT_STORAGE_KEY = "kardesler_payment_method";
  const [paymentMethod, setPaymentMethodState] = useState("cash");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PAYMENT_STORAGE_KEY);
      if (saved === "cash" || saved === "card") setPaymentMethodState(saved);
    } catch {}
  }, []);
  // Persist on change only (in the setter, not an effect) so the initial
  // "cash" state can never overwrite a saved choice before it loads.
  const setPaymentMethod = (value) => {
    setPaymentMethodState(value);
    try {
      localStorage.setItem(PAYMENT_STORAGE_KEY, value);
    } catch {}
  };

  // Order mode: "dinein" (customer is at the restaurant — build a
  // list, show it to the waiter) or "delivery" (online order —
  // address form + WhatsApp). ONE drawer serves both audiences, and
  // mixing the two journeys in a single layout confused both of
  // them (owner complaint 2026-11-26), so the drawer renders exactly
  // one path per mode. The drawer ALWAYS opens in delivery mode
  // (owner rule 2026-11-27): the mode used to persist in
  // localStorage, so a phone that once tried "Restoranda" kept
  // opening there. Switching inside an open session still works —
  // the choice is deliberately no longer read from or written to
  // storage, so every open starts on delivery.
  const [orderMode, setOrderModeState] = useState("delivery");
  const setOrderMode = (value) => setOrderModeState(value);
  const isDineIn = orderMode === "dinein";

  // Delivery address (mandatory for WhatsApp orders). The whole form is
  // persisted next to the cart (kardesler_cart) so returning customers are
  // prefilled; every keystroke saves, so edits and completed orders alike
  // update the saved address. City is fixed to İstanbul — the restaurant
  // only delivers there — and the district is one of the 5 delivery areas.
  const ADDRESS_STORAGE_KEY = "kardesler_address";
  const DELIVERY_CITY = "İstanbul";
  const DELIVERY_DISTRICTS = ["Beyoğlu", "Şişli", "Beşiktaş", "Fatih"];
  // Minimum order amounts (₺) per delivery district — owner rule
  // 2026-11-26: Beyoğlu ₺400, every other district ₺1,000. Compared
  // against the cart's live estimated total at order time.
  const DISTRICT_MINIMUMS = { "Beyoğlu": 400, "Şişli": 1000, "Beşiktaş": 1000, "Fatih": 1000 };
  const EMPTY_ADDRESS = { name: "", district: "", neighborhood: "", details: "", buildingNo: "", floor: "", apartment: "", note: "" };
  const [address, setAddressState] = useState(EMPTY_ADDRESS);
  // Expanded by default: the address form sits directly under the cart
  // items (before the order button in the sticky footer) and must be
  // reachable without hunting — owner UX fix 2026-11-26. Still
  // collapsible via the section header for returning customers whose
  // saved address is already complete.
  const [addressOpen, setAddressOpen] = useState(true);
  const [orderAttempted, setOrderAttempted] = useState(false);
  const [minAttempted, setMinAttempted] = useState(false);
  // "Use my location" autofill: spinner state + a quiet inline note
  // ("outside" = geocoded district is not one of the 4 delivery areas,
  // "failed" = permission denied / timeout / geocode error, "filled" =
  // the form was just prefilled from the position — please verify).
  // The note clears on the next manual field edit or the next attempt.
  const [locating, setLocating] = useState(false);
  const [locationNote, setLocationNote] = useState(null);
  // Mahalle entry mode: with a district chosen, the mahalle is
  // picked from that district's official mahalles (see lib/mahalleler);
  // "other" mode swaps in the free-text input for anything unlisted.
  // A saved value that is not in the district's list opens in other
  // mode with its text preserved — the list never traps the user.
  const [mahalleOther, setMahalleOther] = useState(false);
  // Mahalle picker: the field is a custom searchable picker, NOT a
  // native <select> — on Android the native control opens the OS
  // radio list (45-57 rows of blind scrolling, no search), which the
  // owner rejected on his phone (2026-11-27). The picker is an
  // overlay inside the drawer with a search box on top; its query
  // resets on every open so it always starts from the full list.
  const [mahallePickerOpen, setMahallePickerOpen] = useState(false);
  const [mahalleQuery, setMahalleQuery] = useState("");
  const selectedMahalleRef = useRef(null);
  // Closing the drawer always closes the picker with it, so a
  // reopened drawer starts on the form, never mid-pick.
  useEffect(() => {
    if (!isCartOpen) setMahallePickerOpen(false);
  }, [isCartOpen]);
  // On open, bring the current selection into view inside the list.
  useEffect(() => {
    if (mahallePickerOpen) {
      selectedMahalleRef.current?.scrollIntoView({ block: "center" });
    }
  }, [mahallePickerOpen]);
  // "Add my location to the order" opt-in: OFF by default and never
  // persisted — sharing a live pin is a per-order consent.
  const [addLocation, setAddLocation] = useState(false);
  // Spinner state for the WhatsApp CTA while it runs the position
  // capture for the location opt-in (sending waits for the capture).
  const [orderLocating, setOrderLocating] = useState(false);
  // Fields the location autofill just wrote ({ district, neighborhood,
  // details }): they render with an olive "detected — please check"
  // ring (Baymard lookup + verification pattern: an auto-filled value
  // is a suggestion the customer confirms, not a silent fact). Each
  // field's ring clears when the customer edits that field.
  const [filledFields, setFilledFields] = useState({});
  // KVKK footer notice: collapsed to a single truncated line by
  // default (owner rule — one line, tap to see the rest); the tap
  // expands the full text in place, a second tap collapses it.
  const [kvkkOpen, setKvkkOpen] = useState(false);
  const addressSectionRef = useRef(null);
  // Field refs so a failed order attempt (or a tap on the delivery
  // bar) can move focus straight to the first missing field.
  const nameInputRef = useRef(null);
  const districtChipsRef = useRef(null);
  const neighborhoodInputRef = useRef(null);
  const detailsTextareaRef = useRef(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(ADDRESS_STORAGE_KEY) || "null");
      if (saved && typeof saved === "object") {
        // Legacy saved objects may still carry a phone — ignored on
        // purpose (the phone field was removed; see addressErrors).
        setAddressState({
          name: saved.name || "",
          district: DELIVERY_DISTRICTS.includes(saved.district) ? saved.district : "",
          neighborhood: saved.neighborhood || "",
          details: saved.details || "",
          buildingNo: saved.buildingNo || "",
          floor: saved.floor || "",
          apartment: saved.apartment || "",
          note: saved.note || "",
        });
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist in the setter (same pattern as the payment method) so the
  // initial empty state can never overwrite a saved address on mount.
  const setAddress = (patch) => {
    // Any manual edit (or a successful autofill patch) dismisses the
    // location note from a previous locate attempt.
    setLocationNote(null);
    setAddressState((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Manual edits go through here: editing a field the autofill wrote
  // also clears that field's "detected" ring — the customer has now
  // verified/replaced the value themselves. (The autofill itself
  // calls setAddress directly, then sets the rings.)
  const editAddress = (patch) => {
    setFilledFields((prev) => {
      if (!Object.keys(patch).some((k) => prev[k])) return prev;
      const next = { ...prev };
      for (const k of Object.keys(patch)) next[k] = false;
      return next;
    });
    setAddress(patch);
  };

  // Keep the mahalle entry mode in sync when the DISTRICT changes
  // (chip tap, saved-address load, location autofill): a value in the
  // new district's official list shows the select; a non-empty value
  // outside the list keeps the free-text input, text preserved.
  const prevDistrictRef = useRef(address.district);
  useEffect(() => {
    if (prevDistrictRef.current === address.district) return;
    prevDistrictRef.current = address.district;
    const list = MAHALLELER[address.district] || [];
    setMahalleOther(!!address.neighborhood && !list.includes(address.neighborhood));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address.district]);

  // "Use my location" autofill: one tap → accuracy-gated position
  // (see captureAccuratePosition) → Nominatim reverse geocode in
  // geocodejson format — the stable classification, whose `admin`
  // levels come from real boundary containment (level6 = ilçe,
  // level8 = mahalle) instead of nearest-object guessing → fill
  // district / neighborhood / street line. Confidence gate: with a
  // fix wider than 75 m the mahalle is NOT prefilled (a 100 m circle
  // at Sıraselviler spans Cihangir, Kuloğlu and Firuzağa at once) —
  // the district and street still fill and the customer picks the
  // mahalle from the list. Never blocks manual entry: denial, timeout
  // or an out-of-area result only shows a quiet note under the button
  // and leaves the form untouched.
  const handleUseMyLocation = async () => {
    if (locating) return;
    setLocating(true);
    setLocationNote(null);
    const fix = await captureAccuratePosition();
    if (!fix) {
      setLocating(false);
      setLocationNote("failed");
      return;
    }
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=${fix.latitude}&lon=${fix.longitude}&zoom=18`,
        { headers: { "Accept-Language": "tr" } }
      );
      if (!res.ok) throw new Error("reverse geocode failed");
      const data = await res.json();
      const g = data?.features?.[0]?.properties?.geocoding || {};
      const admin = g.admin || {};
      // Turkish-aware fold so "BEYOĞLU" / "Şişli" compare equal, and
      // drop a trailing "İlçesi" ("Beyoğlu İlçesi" → "Beyoğlu").
      const normalizeDistrict = (s) =>
        (s || "")
          .trim()
          .toLocaleLowerCase("tr-TR")
          .replace(/\s+ilçesi$/, "")
          .trim();
      // geocodejson field map (verified live): the ilçe arrives as
      // admin.level6 (or `city`); the mahalle as admin.level8 (or
      // `district` / `suburb`); the street as `street` + `housenumber`.
      let matched = null;
      for (const candidate of [admin.level6, g.city, g.county]) {
        matched = DELIVERY_DISTRICTS.find(
          (d) => normalizeDistrict(d) === normalizeDistrict(candidate)
        );
        if (matched) break;
      }
      if (!matched) {
        setLocationNote("outside");
        return;
      }
      const patch = { district: matched };
      // Graded trust in the mahalle (accuracy research notes): a
      // value derived from a boundary polygon — admin.level8, or any
      // field carrying the "…Mahallesi" form — outranks a bare suburb
      // NODE name, which is only a nearest-label guess (the Kuloğlu
      // failure was a bare node name). The standard gate (fix
      // <= 75 m) trusts boundary-derived names; a bare node name is
      // trusted only with a tight fix (<= 30 m).
      const rawMahalle = admin.level8 || g.district || g.suburb || g.neighbourhood || g.quarter || "";
      const boundaryDerived = !!admin.level8 || /mahallesi\.?$/i.test(rawMahalle.trim());
      if (fix.accuracy <= 75 && (boundaryDerived || fix.accuracy <= 30)) {
        const mahalle = rawMahalle
          .trim()
          .replace(/\s+mahallesi\.?$/i, "")
          .replace(/\s+mah\.?$/i, "")
          .trim();
        if (mahalle) patch.neighborhood = mahalle;
      }
      // Street line only fills an EMPTY details field — never
      // overwrite something the customer already typed.
      if (!address.details.trim()) {
        const streetLine = [g.street, g.housenumber ? `No:${g.housenumber}` : ""]
          .filter(Boolean)
          .join(" ");
        if (streetLine) patch.details = streetLine;
      }
      setAddress(patch);
      // Ring exactly the fields this prefill wrote, so the customer
      // verifies the detected values before they reach the kitchen.
      setFilledFields({
        district: !!patch.district,
        neighborhood: !!patch.neighborhood,
        details: !!patch.details,
      });
      // The prefill may land while the district stays the same (the
      // district-change effect would not fire): sync the mahalle
      // entry mode with the detected value explicitly.
      if (patch.neighborhood) {
        setMahalleOther(!(MAHALLELER[matched] || []).includes(patch.neighborhood));
      }
      setLocationNote("filled");
    } catch {
      setLocationNote("failed");
    } finally {
      setLocating(false);
    }
  };

  // Required: name, district, neighborhood, address details. Note is
  // optional. No phone field: the order arrives from the customer's
  // own WhatsApp, so the restaurant already has the number — asking
  // for it again only costs completions.
  const addressErrors = {
    name: !address.name.trim(),
    district: !DELIVERY_DISTRICTS.includes(address.district),
    neighborhood: !address.neighborhood.trim(),
    details: !address.details.trim(),
  };
  const addressComplete = !Object.values(addressErrors).some(Boolean);
  // Optional structured building details (Bina No / Kat / Daire):
  // appended to the address as one segment when any of them is
  // filled, with fixed Turkish labels — the WhatsApp order message
  // is kitchen language, like the portion labels.
  const buildingSegment = [
    address.buildingNo.trim() ? `Bina No: ${address.buildingNo.trim()}` : "",
    address.floor.trim() ? `Kat: ${address.floor.trim()}` : "",
    address.apartment.trim() ? `Daire: ${address.apartment.trim()}` : "",
  ]
    .filter(Boolean)
    .join(", ");
  const fullAddress = [DELIVERY_CITY, address.district, address.neighborhood.trim(), address.details.trim(), buildingSegment]
    .filter(Boolean)
    .join(" / ");

  // Focus the first missing field (in form order) — used after a
  // failed order attempt so the tap takes the user to the problem
  // instead of just reporting it from a distance.
  const focusFirstMissingField = () => {
    const refs = {
      district: districtChipsRef,
      name: nameInputRef,
      neighborhood: neighborhoodInputRef,
      details: detailsTextareaRef,
    };
    const first = ["district", "name", "neighborhood", "details"].find((k) => addressErrors[k]);
    if (first) refs[first].current?.focus({ preventScroll: true });
  };

  // Open the address form, smooth-scroll it into view, and optionally
  // focus the first missing field once the scroll settles.
  const revealAddressForm = (focusMissing) => {
    setAddressOpen(true);
    setTimeout(() => {
      addressSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      if (focusMissing) setTimeout(focusFirstMissingField, 400);
    }, 60);
  };

  // District minimum, checked against the same live estimated total the
  // drawer shows ("Tahmini Toplam", ₺). Null while no district is chosen
  // or prices are unavailable (the order button is hidden then anyway).
  const districtMinimum = DISTRICT_MINIMUMS[address.district] ?? null;
  const belowMinimum =
    districtMinimum !== null && cartTotal !== null && cartTotal < districtMinimum;
  const fillMoney = (v) => `${convertPrice(v)} ${symbol}`;
  const fillTokens = (tpl, map) =>
    Object.entries(map).reduce((s, [k, v]) => s.split(`{${k}}`).join(String(v)), tpl);

  // WhatsApp checkout: structured order message built from the cart with
  // live ₺ prices. Null while prices load or if any price is unavailable,
  // in which case the button is hidden (the call path stays available).
  // The args are kept in one object so the location opt-in can rebuild
  // the identical message with a maps link appended at send time.
  const waOrderArgs = {
        cart,
        getItemName: (id) => menuT.items[id]?.name || id,
        getLivePrice,
        // Portion-aware pricing + labels: cart lines are keyed by
        // dish + portion, so a Duble line must be priced at 2x and
        // named as Duble in the message (matches the drawer totals).
        getUnitPrice: (item) => getPortionUnitPrice(item, item.portion || "full"),
        getPortionLabel: (item) => {
          const p = item.portion || "full";
          return p !== "full" ? portionLabels[p] || p : null;
        },
        labels: {
          title: wa.title || "New Order",
          total: labels.total || "Total",
          name: wa.name || "Name",
          address: wa.address || "Address",
          note: wa.note || "Note",
          payment: wa.payment || "Payment",
        },
        payment:
          paymentMethod === "card"
            ? wa.payCardAtDoor || "Card at the door"
            : wa.payCashAtDoor || "Cash at the door",
        delivery: {
          name: address.name.trim(),
          address: fullAddress,
          note: address.note.trim(),
        },
      };
  const whatsappUrl = pricesLoading ? null : buildWhatsAppOrderUrl(waOrderArgs);
  // Mahalle picker list: the selected district's official mahalles,
  // filtered by the search query through the Turkish-aware fold.
  const mahalleList = MAHALLELER[address.district] || [];
  const foldedMahalleQuery = foldMahalleSearch(mahalleQuery.trim());
  const filteredMahalles = foldedMahalleQuery
    ? mahalleList.filter((m) => foldMahalleSearch(m).includes(foldedMahalleQuery))
    : mahalleList;
  const isRTL = lang === "ar" || lang === "fa";

  const waiterText = t.showWaiter || (lang === "ar" ? "اعرض هذه القائمة للجرسون لإتمام طلبك" : 
                     lang === "tr" ? "Siparişinizi vermek için bu listeyi garsona gösterin" : 
                     "Show this list to the waiter to order");

  const listTitle = t.myList || (lang === "ar" ? "قائمتي" : 
                    lang === "tr" ? "Listem" : 
                    "My List");

  const isMounted = useMounted();
  if (!isMounted) return null;

  return (
    <>
      {/* ═══════════════════════════════════════════
          FAB (Floating Action Button) - My List
          ═══════════════════════════════════════════ */}
      {cartCount > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className={`fixed bottom-6 ${isRTL ? "left-6" : "right-6"} z-[99990] flex items-center gap-2 bg-[#9C7A3F] text-white px-5 py-3.5 rounded-full shadow-xl hover:bg-[#7A5F2E] hover:scale-105 transition-all duration-300 ${cartPulse ? 'animate-bounce' : ''}`}
        >
          <ClipboardList size={22} />
          <span className="font-bold text-[15px]" style={{ fontFamily: "var(--font-cairo)" }}>
            {listTitle} ({cartCount})
          </span>
        </button>
      )}

      {/* ═══════════════════════════════════════════
          LIST DRAWER (Bottom Sheet)
          ═══════════════════════════════════════════ */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-[99998] flex items-end sm:items-stretch sm:justify-end bg-black/80 backdrop-blur-md modal-overlay"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="bg-[#FAF7F0] w-full sm:max-w-md sm:h-full max-h-[94dvh] sm:max-h-full rounded-t-3xl sm:rounded-none overflow-hidden flex flex-col shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header — ONE row, engineered for comfort. The drawer
                serves two audiences (dine-in guests showing the list
                to a waiter, online customers ordering delivery) and
                each mode renders only its own path below. Comfort
                rules for this row: a compact calm title cluster
                (15px/600 — nothing in the row is larger or bolder),
                a TEXT-ONLY segmented switch (no in-tab icons, no
                max-width cap) so both mode labels render fully even
                at 360px, and a standard 36px close button. */}
            <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-[#9C7A3F]/20 shrink-0 bg-[#F7F2E7]">
              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
                <span className="flex items-center justify-center rounded-lg bg-[#9C7A3F]/[0.12] p-1.5 shrink-0">
                  <ClipboardList size={17} className="text-[#9C7A3F]" />
                </span>
                <h2 className="flex items-center text-[15px] font-semibold text-[#2B2620]" style={{ fontFamily: "var(--font-cairo)" }}>
                  {listTitle}
                  {cartCount > 0 && (
                    <span className="ms-1.5 inline-flex items-center rounded-full bg-[#9C7A3F] px-[7px] py-[2px] text-[11px] font-bold leading-none text-[#F7F2E7]" style={{ fontFamily: "var(--font-inter)" }}>
                      {cartCount}
                    </span>
                  )}
                </h2>
              </div>
              <div
                role="tablist"
                aria-label={labels.modeDelivery || "Order mode"}
                className="flex-1 min-w-0 flex items-center h-9 rounded-[11px] bg-[#EDE3CE] border border-[#9C7A3F]/15 p-[3px] gap-[3px]"
              >
                {[
                  { key: "dinein", text: labels.modeDineIn || "Restoranda" },
                  { key: "delivery", text: labels.modeDelivery || "Paket Sipariş" },
                ].map(({ key, text }) => {
                  const active = orderMode === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setOrderMode(key)}
                      className={`flex-1 h-full flex items-center justify-center rounded-[8px] px-1 text-[13.5px] font-medium whitespace-nowrap transition-all duration-200 active:scale-[0.97] ${
                        active
                          ? "bg-[#4E5F4C] text-white shadow-sm"
                          : "text-[#6B6353] hover:text-[#2B2620] hover:bg-[#4E5F4C]/10"
                      }`}
                      style={{ fontFamily: "var(--font-cairo)" }}
                    >
                      {text}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                aria-label={t.close || "Close"}
                className="w-9 h-9 shrink-0 rounded-full bg-[#EDE3CE] flex items-center justify-center text-[#2B2620] hover:bg-[#9C7A3F]/25 active:scale-95 transition-all duration-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Delivery bar — pinned under the header, OUTSIDE the
                scroll area, so the delivery-address state is visible
                at every scroll position: a tappable prompt while the
                address is incomplete, a one-line data summary once
                saved. Tapping it scrolls to the form below and (while
                incomplete) focuses the first missing field. */}
            {orderMode === "delivery" && cart.length > 0 && (
              <button
                type="button"
                onClick={() => revealAddressForm(!addressComplete)}
                className={`w-full flex items-center gap-2.5 px-4 py-2 text-start shrink-0 border-b transition-all duration-200 hover:brightness-105 active:scale-[0.99] ${
                  addressComplete
                    ? "bg-[#4E5F4C] border-[#4E5F4C]"
                    : "bg-[#9C7A3F]/10 border-[#9C7A3F]/25 hover:bg-[#9C7A3F]/15"
                }`}
              >
                {addressComplete ? (
                  <CheckCircle size={16} className="text-[#EDE3CE] shrink-0" />
                ) : (
                  <MapPin size={16} className="text-[#9C7A3F] shrink-0" />
                )}
                {addressComplete ? (
                  <>
                    <span className="flex-1 min-w-0 truncate text-[13px] font-semibold text-[#F7F2E7]" style={{ fontFamily: "var(--font-inter)" }}>
                      {address.district}, {address.neighborhood.trim()}, {address.details.trim()}
                    </span>
                    <span className="text-[12px] font-bold text-[#EDE3CE] underline underline-offset-2 shrink-0" style={{ fontFamily: "var(--font-inter)" }}>
                      {labels.editAddress || "Edit"}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="flex-1 min-w-0 text-[13px] font-bold text-[#2B2620]" style={{ fontFamily: "var(--font-cairo)" }}>
                      {labels.deliveryBarAdd || labels.addAddress || "Add your delivery address"}
                    </span>
                    <Plus size={16} className="text-[#9C7A3F] shrink-0" />
                  </>
                )}
              </button>
            )}

            {/* List Items — min-h-0 is load-bearing: without it this
                flex child can be forced taller than its allotment and
                its translucent bg paints over the footer's top edge
                (the washed-out payment label the owner screenshotted) */}
            <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 py-4 bg-[#EDE3CE]/30">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-[#9C7A3F]/10 flex items-center justify-center mb-5">
                    <ClipboardList size={32} className="text-[#9C7A3F]/40" />
                  </div>
                  <p className="text-[#7A7364] font-medium mb-1">{labels.empty || "Your list is empty"}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item, idx) => {
                    const portion = item.portion || "full";
                    const name = menuT.items[item.id]?.name || item.id;
                    const portionLabel = portion !== "full" ? (portionLabels[portion] || portion) : null;
                    const unitPrice = getPortionUnitPrice(item, portion);
                    const itemSubtotal = unitPrice !== null ? unitPrice * item.qty : null;
                    return (
                      <div
                        key={`${item.id}__${portion}`}
                        className="flex flex-col gap-2 p-3 rounded-xl bg-white border border-[#9C7A3F]/15 shadow-sm group animate-fadeIn"
                      >
                      <div className="flex items-center gap-3">
                        {/* Thumbnail */}
                        {item.image ? (
                          <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 relative bg-[#EDE3CE]">
                            <Image
                              src={item.image}
                              alt={name}
                              fill
                              style={{ objectFit: "cover" }}
                              sizes="56px"
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-lg bg-[#EDE3CE] flex items-center justify-center shrink-0">
                            <ClipboardList size={18} className="text-[#9C7A3F]" />
                          </div>
                        )}

                        {/* Item info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-[#2B2620] truncate" style={{ fontFamily: "var(--font-cairo)" }}>
                            {name}
                            {portionLabel && (
                              <span className="ms-1.5 inline-block align-middle px-1.5 py-0.5 rounded-[4px] bg-[#9C7A3F]/15 text-[#9C7A3F] text-[10px] font-bold" style={{ fontFamily: "var(--font-inter)" }}>
                                {portionLabel}
                              </span>
                            )}
                          </p>
                          {pricesLoading ? (
                            <p className="text-[11px] text-[#9C7A3F] mt-0.5 animate-pulse" style={{ fontFamily: "var(--font-inter)" }}>{labels.loading || "Loading..."}</p>
                          ) : itemSubtotal == null ? (
                            <p className="text-[11px] text-[#A0422E] mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{labels.unavailable || "Unavailable"}</p>
                          ) : (
                            <p className="text-[11px] text-[#7A7364] mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                              {item.qty} × {convertPrice(unitPrice)} {symbol} = {convertPrice(itemSubtotal)} {symbol}
                            </p>
                          )}
                        </div>

                        {/* Qty controls */}
                        <div className="flex items-center gap-1.5 shrink-0 bg-[#F7F2E7] rounded-lg p-1 border border-[#9C7A3F]/20">
                          <button
                            onClick={() => removeFromCart(item.id, portion)}
                            className="w-7 h-7 rounded-md bg-white flex items-center justify-center text-[#2B2620] shadow-sm hover:text-[#A0422E] transition-colors"
                          >
                            {item.qty === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                          </button>
                          <span
                            key={item.qty}
                            className="w-5 text-center text-xs font-bold text-[#2B2620]"
                          >
                            {item.qty}
                          </span>
                          <button
                            onClick={() => addToCart(item, portion)}
                            className="w-7 h-7 rounded-md bg-[#9C7A3F] flex items-center justify-center text-white shadow-sm hover:bg-[#7A5F2E] transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Portion switcher — change this line's portion in place */}
                      <PortionSelector
                        itemId={item.id}
                        value={portion}
                        onChange={(next) => changeCartLinePortion(item.id, portion, next)}
                        size="sm"
                        labelsOverride={PORTION_LABELS_TR}
                      />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Dine-in instruction panel — the ONLY call to action
                  in Restoranda mode: the guest shows this list to the
                  waiter. Prominent olive panel under the items, so
                  the path is unmistakable (the waiter text used to be
                  a thin strip stacked on top of the delivery bar). */}
              {isDineIn && cart.length > 0 && (
                <div className="mt-4 rounded-2xl bg-[#4E5F4C] text-[#F7F2E7] px-5 py-6 text-center shadow-sm">
                  <p className="text-[19px] font-bold leading-snug" style={{ fontFamily: "var(--font-cairo)" }}>
                    {waiterText}
                  </p>
                </div>
              )}

              {/* Delivery Address (mandatory for WhatsApp orders) —
                  directly under the items, before total/payment/order
                  button (sticky footer below). A failed order attempt
                  scrolls here and rings the section red until complete. */}
              {orderMode === "delivery" && cart.length > 0 && (
                <div
                  ref={addressSectionRef}
                  className={`mt-4 rounded-xl bg-white shadow-sm overflow-hidden border transition-shadow ${
                    orderAttempted && !addressComplete
                      ? "border-[#A0422E]/70 ring-2 ring-[#A0422E]/70"
                      : "border-[#9C7A3F]/15"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setAddressOpen((v) => !v)}
                    className="w-full flex items-center gap-3 p-3 text-start"
                    aria-expanded={addressOpen}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#9C7A3F]/15 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-[#9C7A3F]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#2B2620]" style={{ fontFamily: "var(--font-cairo)" }}>
                        {address.name || address.district || address.neighborhood
                          ? labels.addressTitle || "Delivery Address"
                          : labels.addAddress || "Add Address"}
                      </p>
                      {addressComplete ? (
                        <p className="text-[11px] text-[#4E5F4C] font-medium flex items-center gap-1" style={{ fontFamily: "var(--font-inter)" }}>
                          <CheckCircle size={12} />
                          {labels.addressSaved || "Address saved"}
                          <span className="text-[#7A7364] truncate">
                            , {address.district} / {address.neighborhood.trim()}
                          </span>
                        </p>
                      ) : null}
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-[#7A7364] shrink-0 transition-transform ${addressOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {addressOpen && (
                    <div className="px-3 pb-3 pt-1 space-y-3 border-t border-[#9C7A3F]/10">
                      {/* "Use my location" autofill — one tap fills
                          district / neighborhood / street from the
                          device position; manual entry stays untouched
                          on any failure (see handleUseMyLocation). */}
                      <div>
                        <button
                          type="button"
                          onClick={handleUseMyLocation}
                          disabled={locating}
                          className="w-full h-10 rounded-lg bg-[#FAF7F0] border border-[#4E5F4C]/30 text-[#4E5F4C] text-sm font-bold flex items-center justify-center gap-2 transition-colors hover:border-[#4E5F4C]/60 disabled:opacity-60"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {locating ? (
                            <Loader2 size={16} className="animate-spin shrink-0" />
                          ) : (
                            <LocateFixed size={16} className="shrink-0" />
                          )}
                          {locating
                            ? labels.locating || "Locating…"
                            : labels.useMyLocation || "Use my location"}
                        </button>
                        {locationNote === "outside" && (
                          <p className="text-[12px] text-[#A0422E] mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                            {labels.locationOutsideArea || "Your location appears to be outside our delivery area"}
                          </p>
                        )}
                        {locationNote === "failed" && (
                          <p className="text-[12px] text-[#7A7364] mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                            {labels.locationFailed || "Couldn't get your location — please type your address"}
                          </p>
                        )}
                        {locationNote === "filled" && (
                          <p className="text-[12px] font-medium text-[#4E5F4C] mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                            {labels.locationFilledCheck || "Filled from your location — please check"}
                          </p>
                        )}
                      </div>

                      {orderAttempted && !addressComplete && (
                        <p className="text-[12px] font-medium text-[#A0422E] bg-[#A0422E]/10 rounded-lg px-3 py-2" style={{ fontFamily: "var(--font-inter)" }}>
                          {labels.addressIncomplete || "Please fill in the required fields to place your order"}
                        </p>
                      )}

                      {minAttempted && belowMinimum && (
                        <p className="text-[12px] font-medium text-[#A0422E] bg-[#A0422E]/10 rounded-lg px-3 py-2" style={{ fontFamily: "var(--font-inter)" }}>
                          {fillTokens(
                            labels.minimumOrderHint ||
                              "The minimum order for {district} is {min}. Your cart is {total}; add {missing} more to place your order.",
                            {
                              district: address.district,
                              min: fillMoney(districtMinimum),
                              total: fillMoney(cartTotal),
                              missing: fillMoney(districtMinimum - cartTotal),
                            }
                          )}
                        </p>
                      )}

                      {/* District — 4 tappable chips instead of a
                          dropdown: every option visible, one tap, no
                          picker friction on mobile. */}
                      <div>
                        <label className="block text-[11px] font-bold text-[#7A7364] mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                          {labels.districtLabel || "District"}
                        </label>
                        <div className={`flex flex-wrap gap-2 ${orderAttempted && addressErrors.district ? "rounded-lg ring-2 ring-[#A0422E]/50 p-1 -m-1" : filledFields.district ? "rounded-lg ring-2 ring-[#4E5F4C]/40 p-1 -m-1" : ""}`}>
                          {DELIVERY_DISTRICTS.map((d, i) => {
                            const active = address.district === d;
                            return (
                              <button
                                key={d}
                                ref={i === 0 ? districtChipsRef : undefined}
                                type="button"
                                aria-pressed={active}
                                onClick={() => editAddress({ district: d })}
                                className={`px-3.5 py-2 rounded-full text-sm font-bold border transition-colors ${
                                  active
                                    ? "bg-[#9C7A3F] text-white border-[#9C7A3F]"
                                    : "bg-[#FAF7F0] text-[#2B2620] border-[#9C7A3F]/30 hover:border-[#9C7A3F]"
                                }`}
                                style={{ fontFamily: "var(--font-inter)" }}
                              >
                                {d}
                              </button>
                            );
                          })}
                        </div>
                        {orderAttempted && addressErrors.district && (
                          <p className="text-[11px] text-[#A0422E] mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                            {labels.fieldRequired || "This field is required"}
                          </p>
                        )}
                        {districtMinimum !== null && (
                          <p className="text-[11px] text-[#7A7364] mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                            {fillTokens(labels.districtMinimum || "Minimum order for this district: {amount}", {
                              amount: fillMoney(districtMinimum),
                            })}
                          </p>
                        )}
                      </div>

                      {/* Name */}
                      <div>
                        <label className="block text-[11px] font-bold text-[#7A7364] mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                          {labels.nameLabel || "Name"}
                        </label>
                        <input
                          ref={nameInputRef}
                          type="text"
                          value={address.name}
                          autoComplete="name"
                          autoCorrect="off"
                          spellCheck={false}
                          onChange={(e) => editAddress({ name: e.target.value })}
                          placeholder={labels.namePlaceholder || ""}
                          className={`w-full rounded-lg border bg-[#FAF7F0] px-3 py-2.5 text-sm text-[#2B2620] outline-none focus:border-[#9C7A3F] ${
                            orderAttempted && addressErrors.name ? "border-[#A0422E]/70" : "border-[#9C7A3F]/30"
                          }`}
                          style={{ fontFamily: "var(--font-inter)" }}
                        />
                        {orderAttempted && addressErrors.name && (
                          <p className="text-[11px] text-[#A0422E] mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                            {labels.fieldRequired || "This field is required"}
                          </p>
                        )}
                      </div>

                      {/* Neighborhood (Mahalle) — with a district
                          chosen, a button that opens the searchable
                          picker over that district's official
                          mahalles (saved values and location autofill
                          preselect from the same string); "Diğer" in
                          the picker swaps in the free-text input so
                          an unlisted mahalle is never blocked.
                          Without a district, the plain text input
                          as before. */}
                      <div>
                        <label className="block text-[11px] font-bold text-[#7A7364] mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                          {labels.neighborhoodLabel || "Neighborhood"}
                        </label>
                        {address.district && !mahalleOther ? (
                          <button
                            ref={neighborhoodInputRef}
                            type="button"
                            aria-haspopup="dialog"
                            onClick={() => {
                              setMahalleQuery("");
                              setMahallePickerOpen(true);
                            }}
                            className={`w-full flex items-center gap-2 rounded-lg border bg-[#FAF7F0] px-3 py-2.5 text-sm outline-none focus:border-[#9C7A3F] ${
                              orderAttempted && addressErrors.neighborhood
                                ? "border-[#A0422E]/70"
                                : filledFields.neighborhood
                                  ? "border-[#4E5F4C]/60 ring-2 ring-[#4E5F4C]/30"
                                  : "border-[#9C7A3F]/30"
                            }`}
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            <span
                              className={`flex-1 min-w-0 truncate text-start ${
                                mahalleList.includes(address.neighborhood)
                                  ? "text-[#2B2620]"
                                  : "text-[#7A7364]"
                              }`}
                            >
                              {mahalleList.includes(address.neighborhood)
                                ? address.neighborhood
                                : labels.neighborhoodPlaceholder || ""}
                            </span>
                            <ChevronDown size={16} className="shrink-0 text-[#7A7364]" />
                          </button>
                        ) : (
                          <div className="relative">
                            <input
                              ref={neighborhoodInputRef}
                              type="text"
                              value={address.neighborhood}
                              autoComplete="address-level3"
                              autoCorrect="off"
                              spellCheck={false}
                              onChange={(e) => editAddress({ neighborhood: e.target.value })}
                              placeholder={labels.neighborhoodPlaceholder || ""}
                              className={`w-full rounded-lg border bg-[#FAF7F0] px-3 py-2.5 text-sm text-[#2B2620] outline-none focus:border-[#9C7A3F] ${
                                address.district ? "pe-11" : ""
                              } ${
                                orderAttempted && addressErrors.neighborhood
                                  ? "border-[#A0422E]/70"
                                  : filledFields.neighborhood
                                    ? "border-[#4E5F4C]/60 ring-2 ring-[#4E5F4C]/30"
                                    : "border-[#9C7A3F]/30"
                              }`}
                              style={{ fontFamily: "var(--font-inter)" }}
                            />
                            {/* Way back to the list: "other" mode used
                                to be a one-way trap — a saved free-text
                                mahalle (not in the district's official
                                list) rendered this plain input with no
                                affordance to reopen the picker, so the
                                selection looked missing entirely (owner
                                report 2026-11-27, desktop). With a
                                district chosen, the trailing button
                                reopens the picker; picking a listed
                                mahalle returns the field to picker
                                mode, closing without picking keeps the
                                typed text. */}
                            {address.district && (
                              <button
                                type="button"
                                aria-haspopup="dialog"
                                aria-label={labels.chooseFromList || "Choose from list"}
                                title={labels.chooseFromList || "Choose from list"}
                                onClick={() => {
                                  setMahalleQuery("");
                                  setMahallePickerOpen(true);
                                }}
                                className="absolute end-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-[#7A7364] hover:bg-[#9C7A3F]/15 hover:text-[#2B2620] active:scale-95 transition-all duration-200"
                              >
                                <ChevronDown size={16} />
                              </button>
                            )}
                          </div>
                        )}
                        {orderAttempted && addressErrors.neighborhood && (
                          <p className="text-[11px] text-[#A0422E] mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                            {labels.fieldRequired || "This field is required"}
                          </p>
                        )}
                      </div>

                      {/* Address details */}
                      <div>
                        <label className="block text-[11px] font-bold text-[#7A7364] mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                          {labels.detailsLabel || "Address Details"}
                        </label>
                        <textarea
                          ref={detailsTextareaRef}
                          value={address.details}
                          autoComplete="street-address"
                          autoCorrect="off"
                          autoCapitalize="off"
                          spellCheck={false}
                          onChange={(e) => editAddress({ details: e.target.value })}
                          placeholder={labels.detailsPlaceholder || ""}
                          rows={3}
                          className={`w-full rounded-lg border bg-[#FAF7F0] px-3 py-2.5 text-sm text-[#2B2620] outline-none focus:border-[#9C7A3F] resize-none ${
                            orderAttempted && addressErrors.details
                              ? "border-[#A0422E]/70"
                              : filledFields.details
                                ? "border-[#4E5F4C]/60 ring-2 ring-[#4E5F4C]/30"
                                : "border-[#9C7A3F]/30"
                          }`}
                          style={{ fontFamily: "var(--font-inter)" }}
                        />
                        {orderAttempted && addressErrors.details && (
                          <p className="text-[11px] text-[#A0422E] mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                            {labels.fieldRequired || "This field is required"}
                          </p>
                        )}
                      </div>

                      {/* Building / floor / apartment — optional
                          structured details (owner request
                          2026-11-27): one compact row, same input
                          styling, persisted with the rest of the
                          address. NOT part of the completeness
                          gates — they only ride along into the
                          WhatsApp message when filled. */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { key: "buildingNo", text: labels.buildingNoLabel || "Bina No" },
                          { key: "floor", text: labels.floorLabel || "Kat" },
                          { key: "apartment", text: labels.apartmentLabel || "Daire" },
                        ].map((f) => (
                          <div key={f.key}>
                            <label className="block text-[11px] font-bold text-[#7A7364] mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                              {f.text}
                            </label>
                            <input
                              type="text"
                              value={address[f.key]}
                              autoCorrect="off"
                              spellCheck={false}
                              onChange={(e) => editAddress({ [f.key]: e.target.value })}
                              className="w-full rounded-lg border border-[#9C7A3F]/30 bg-[#FAF7F0] px-3 py-2.5 text-sm text-[#2B2620] outline-none focus:border-[#9C7A3F]"
                              style={{ fontFamily: "var(--font-inter)" }}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Note — optional */}
                      <div>
                        <label className="block text-[11px] font-bold text-[#7A7364] mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                          {labels.noteLabel || "Note (optional)"}
                        </label>
                        <textarea
                          value={address.note}
                          autoCorrect="off"
                          spellCheck={false}
                          onChange={(e) => editAddress({ note: e.target.value })}
                          placeholder={labels.notePlaceholder || ""}
                          rows={2}
                          className="w-full rounded-lg border border-[#9C7A3F]/30 bg-[#FAF7F0] px-3 py-2.5 text-sm text-[#2B2620] outline-none focus:border-[#9C7A3F] resize-none"
                          style={{ fontFamily: "var(--font-inter)" }}
                        />
                        {/* Sensitive-data hint: the free-text note must not be
                            used for health data (KVKK Art. 6). */}
                        <p className="text-[11px] text-[#7A7364] mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                          {labels.noteHint || "Please do not enter health information (allergies, etc.) in this field."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mahalle picker overlay — covers the drawer panel
                (absolute inset-0 inside the relative panel), so the
                drawer's own scroll and layout are untouched and
                closing returns to the form exactly as it was. Search
                stays pinned on top, the list is flex-1 min-h-0 (it
                shrinks, never gets pushed off, when the keyboard
                opens), and "Diğer" is pinned at the bottom: the
                free-text escape hatch is reachable at all times,
                mid-search included. */}
            {mahallePickerOpen && address.district && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label={labels.neighborhoodLabel || "Neighborhood"}
                className="absolute inset-0 z-40 flex flex-col bg-[#FAF7F0]"
              >
                <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-[#9C7A3F]/20 shrink-0 bg-[#F7F2E7]">
                  <h3
                    className="flex-1 min-w-0 truncate text-[15px] font-semibold text-[#2B2620]"
                    style={{ fontFamily: "var(--font-cairo)" }}
                  >
                    {labels.neighborhoodLabel || "Neighborhood"}
                    <span className="text-[#7A7364] font-medium"> — {address.district}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setMahallePickerOpen(false)}
                    aria-label={t.close || "Close"}
                    className="w-9 h-9 shrink-0 rounded-full bg-[#EDE3CE] flex items-center justify-center text-[#2B2620] hover:bg-[#9C7A3F]/25 active:scale-95 transition-all duration-200"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="px-4 pt-3 pb-2 shrink-0">
                  <div className="relative">
                    <Search
                      size={16}
                      className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-[#7A7364]"
                    />
                    <input
                      type="text"
                      value={mahalleQuery}
                      autoFocus
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      onChange={(e) => setMahalleQuery(e.target.value)}
                      placeholder={labels.searchMahalle || "Search"}
                      className="w-full rounded-lg border border-[#9C7A3F]/30 bg-white ps-9 pe-3 py-2.5 text-sm text-[#2B2620] outline-none focus:border-[#9C7A3F]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    />
                  </div>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto px-2 pb-2">
                  {filteredMahalles.length === 0 ? (
                    <p
                      className="px-3 py-6 text-center text-[13px] text-[#7A7364]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {labels.noMahalleResults || "No results"}
                    </p>
                  ) : (
                    filteredMahalles.map((m) => {
                      const selected = address.neighborhood === m;
                      return (
                        <button
                          key={m}
                          type="button"
                          ref={selected ? selectedMahalleRef : undefined}
                          aria-pressed={selected}
                          onClick={() => {
                            editAddress({ neighborhood: m });
                            // A listed mahalle was picked, so the
                            // field returns to picker-button mode
                            // even when the picker was opened from
                            // the free-text ("other") field.
                            setMahalleOther(false);
                            setMahallePickerOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm transition-colors ${
                            selected
                              ? "bg-[#4E5F4C]/10 font-semibold text-[#4E5F4C]"
                              : "text-[#2B2620] hover:bg-[#9C7A3F]/10"
                          }`}
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          <span className="flex-1 min-w-0 truncate">{m}</span>
                          {selected && <Check size={16} className="shrink-0 text-[#4E5F4C]" />}
                        </button>
                      );
                    })
                  )}
                </div>
                <div className="shrink-0 border-t border-[#9C7A3F]/20 bg-[#F7F2E7] px-2 py-2">
                  <button
                    type="button"
                    onClick={() => {
                      // Escape hatch: reveal the text input, current
                      // text preserved (same as the old select).
                      setMahalleOther(true);
                      setMahallePickerOpen(false);
                    }}
                    className="w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm font-medium text-[#2B2620] hover:bg-[#9C7A3F]/10 transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <span className="flex-1 min-w-0 truncate">{labels.otherMahalle || "Diğer"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Footer — sticky checkout actions (shrink-0 sibling of the
                scroll area, so total → payment → WhatsApp order button
                stays visible while items + address form scroll above) */}
            {cart.length > 0 && (
              <div className="relative z-10 px-5 py-3 border-t border-[#9C7A3F]/20 bg-[#FAF7F0] space-y-3 shrink-0">
                
                {/* Total (Subtle) */}
                <div className="flex items-center justify-center gap-2 text-[#7A7364] text-xs font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                  <span>{t.estimatedTotal || labels.total || "Estimated Total:"}</span>
                  {pricesLoading ? (
                    <span className="animate-pulse">...</span>
                  ) : cartTotal == null ? (
                    <span className="text-[#A0422E]">-</span>
                  ) : (
                    <span>{convertPrice(cartTotal)} {symbol}</span>
                  )}
                </div>

                {isDineIn ? (
                  /* Dine-in footer: total (above) + Clear only. The
                     order is handed to the waiter from the list
                     itself, so payment / WhatsApp / address actions
                     do not belong in this mode. */
                  <div className="flex items-center justify-end px-1 pt-1 pb-1">
                    <button
                      onClick={clearCart}
                      className="text-[12px] text-[#A0422E] font-medium hover:underline opacity-80"
                    >
                      {labels.clear || "Clear List"}
                    </button>
                  </div>
                ) : (
                  <>
                {/* Payment Method (at the door) — ONE line: the label
                    and both plain checkbox units share a single flex
                    row (label at inline-start, no separate label line);
                    flex-wrap lets long locales wrap instead of
                    overflowing. Single-select radio behavior. */}
                <div
                  role="radiogroup"
                  aria-label={labels.paymentMethod || "Payment Method"}
                  className="flex flex-wrap items-center gap-x-[10px] gap-y-1"
                >
                  <span className="shrink-0 text-[#2B2620] text-[13px] leading-4 font-bold" style={{ fontFamily: "var(--font-inter)" }}>
                    {labels.paymentMethod || "Payment Method"}
                  </span>
                  {[
                    { key: "cash", text: labels.payCashAtDoor || "Cash at the Door" },
                    { key: "card", text: labels.payCardAtDoor || "Card at the Door" },
                  ].map((opt) => {
                    const active = paymentMethod === opt.key;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setPaymentMethod(opt.key)}
                        className="flex-none flex items-center gap-[6px] px-1 py-1.5 text-start transition-all duration-200 active:scale-[0.98]"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        <span
                          className={`w-[15px] h-[15px] shrink-0 rounded-[4px] border-[1.5px] flex items-center justify-center transition-all duration-200 ${
                            active
                              ? "bg-[#4E5F4C] border-[#4E5F4C]"
                              : "bg-transparent border-[#7A7364]/50"
                          }`}
                        >
                          {active && <Check size={11} strokeWidth={3.5} className="text-white" />}
                        </span>
                        <span className={`text-[13px] leading-tight whitespace-nowrap ${active ? "font-semibold text-[#4E5F4C]" : "font-normal text-[#2B2620]"}`}>
                          {opt.text}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* "Add my location to the order" opt-in — one
                    plain checkbox unit (same visual language as the
                    payment checkboxes), OFF by default, never
                    persisted. Mainly for foreign customers who can't
                    write a Turkish address: when ON, tapping the
                    order button first runs the accuracy-gated
                    capture and appends a Google Maps link to the
                    WhatsApp message (see the CTA handler). */}
                <div>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={addLocation}
                    onClick={() => setAddLocation((v) => !v)}
                    className="flex items-center gap-[6px] px-1 py-1.5 text-start transition-all duration-200 active:scale-[0.98]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <span
                      className={`w-[15px] h-[15px] shrink-0 rounded-[4px] border-[1.5px] flex items-center justify-center transition-all duration-200 ${
                        addLocation
                          ? "bg-[#4E5F4C] border-[#4E5F4C]"
                          : "bg-transparent border-[#7A7364]/50"
                      }`}
                    >
                      {addLocation && <Check size={11} strokeWidth={3.5} className="text-white" />}
                    </span>
                    <span className={`text-[13px] leading-tight ${addLocation ? "font-semibold text-[#4E5F4C]" : "font-normal text-[#2B2620]"}`}>
                      {labels.addLocationToOrder || "Add my location to the order"}
                    </span>
                  </button>
                </div>

                {/* Order via WhatsApp Button (primary) */}
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      // Delivery address is mandatory: block the order,
                      // open the address form, scroll to it and focus
                      // the first missing field — the tap takes the
                      // user to the problem instead of failing silently.
                      if (!addressComplete) {
                        e.preventDefault();
                        setOrderAttempted(true);
                        revealAddressForm(true);
                        return;
                      }
                      // District minimum — checked after the address, on
                      // the same live estimated total shown in the drawer.
                      if (belowMinimum) {
                        e.preventDefault();
                        setMinAttempted(true);
                        revealAddressForm(false);
                        return;
                      }
                      trackEvent("whatsapp_click", {
                        event_category: "order",
                        event_label: "cart_drawer_checkout",
                        items_count: cartCount,
                      });
                      // Location opt-in: sending waits for one
                      // accuracy-gated capture, then the message goes
                      // out with a Google Maps link appended. A blank
                      // tab is opened NOW, inside the tap gesture, so
                      // popup blockers don't eat it while the capture
                      // runs; it is pointed at the final URL once the
                      // fix resolves. A failed/denied capture sends
                      // the plain order instead — the pin is a bonus,
                      // never a blocker, and no error reaches the
                      // message.
                      if (addLocation) {
                        e.preventDefault();
                        if (orderLocating) return;
                        setOrderLocating(true);
                        const pendingTab = window.open("about:blank", "_blank");
                        captureAccuratePosition()
                          .then((fix) => {
                            const url =
                              (fix
                                ? buildWhatsAppOrderUrl({
                                    ...waOrderArgs,
                                    location: { lat: fix.latitude, lng: fix.longitude },
                                  })
                                : null) || whatsappUrl;
                            if (pendingTab) {
                              pendingTab.location = url;
                            } else {
                              window.location.href = url;
                            }
                          })
                          .finally(() => setOrderLocating(false));
                      }
                    }}
                    className="w-full py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#1EB856] text-white font-bold text-base tracking-wide flex items-center justify-center gap-3 transition-colors shadow-lg mt-2"
                    style={{ fontFamily: "var(--font-cairo)" }}
                  >
                    {orderLocating ? (
                      <Loader2 size={22} className="animate-spin shrink-0" />
                    ) : (
                      <WhatsAppIcon size={22} />
                    )}
                    {/* Smart label: while the address is incomplete the
                        button itself says what is missing; once the
                        address is saved it becomes the order action.
                        While the location opt-in capture runs, it
                        shows the locating state instead. */}
                    <span>
                      {orderLocating
                        ? labels.locating || "Locating…"
                        : addressComplete
                          ? wa.button || "Order via WhatsApp"
                          : labels.addAddressFirst || wa.button || "Order via WhatsApp"}
                    </span>
                  </a>
                )}

                {/* KVKK short notice (Art. 10) — information only, no
                    consent checkbox: order data rests on Art. 5/2-c.
                    Collapsed to ONE truncated line by default (owner
                    rule: one line, tap to see the rest); the tap
                    expands the full text in place and a second tap
                    collapses it again. The /kvkk link stays visible
                    in the collapsed line and inside the expanded
                    text, so it is reachable in both states. */}
                <div className="px-1 text-[11px] leading-relaxed text-[#7A7364]" style={{ fontFamily: "var(--font-inter)" }}>
                  {kvkkOpen ? (
                    <p>
                      {labels.kvkkNotice || "Your order details are processed so that we can fulfil your request. When you send your order, it is transmitted to us via WhatsApp; as WhatsApp's infrastructure is located abroad, your details are transferred abroad through this channel. For details, see:"}{" "}
                      <Link
                        href={lang === "en" ? "/kvkk" : `/${lang}/kvkk`}
                        className="font-semibold text-[#9C7A3F] underline underline-offset-2 hover:text-[#2B2620] transition-colors"
                      >
                        {labels.kvkkLinkLabel || "Information Notice"}
                      </Link>{" "}
                      <button
                        type="button"
                        onClick={() => setKvkkOpen(false)}
                        aria-expanded={true}
                        aria-label={labels.kvkkLinkLabel || "Information Notice"}
                        className="inline-flex align-[-2px] text-[#9C7A3F] hover:text-[#2B2620] transition-colors"
                      >
                        <ChevronUp size={13} />
                      </button>
                    </p>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setKvkkOpen(true)}
                        aria-expanded={false}
                        className="flex min-w-0 flex-1 items-center gap-1 text-start"
                      >
                        <span className="truncate">
                          {labels.kvkkNotice || "Your order details are processed so that we can fulfil your request. When you send your order, it is transmitted to us via WhatsApp; as WhatsApp's infrastructure is located abroad, your details are transferred abroad through this channel. For details, see:"}
                        </span>
                        <ChevronDown size={13} className="shrink-0 text-[#9C7A3F]" />
                      </button>
                      <Link
                        href={lang === "en" ? "/kvkk" : `/${lang}/kvkk`}
                        className="shrink-0 font-semibold text-[#9C7A3F] underline underline-offset-2 hover:text-[#2B2620] transition-colors"
                      >
                        {labels.kvkkLinkLabel || "Information Notice"}
                      </Link>
                    </div>
                  )}
                </div>

                {/* Bottom link row (mockup): call-to-order demoted to
                    a small text link on one side, Clear List on the
                    other — one compact row so the whole sticky
                    footer fits the sheet on short viewports. The
                    label uses the drawer's own sentence-case key:
                    the shared t.callToOrder string is ALL CAPS (it
                    styles a homepage CTA) and must not leak in here. */}
                <div className="flex items-center justify-between px-1 pt-1 pb-1">
                  <a
                    href="tel:+905439233696"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#4E5F4C] hover:underline"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <Phone size={14} />
                    <span>{labels.phoneOrderLabel || "Order by Phone"}</span>
                  </a>
                  <button
                    onClick={clearCart}
                    className="text-[12px] text-[#A0422E] font-medium hover:underline opacity-80"
                  >
                    {labels.clear || "Clear List"}
                  </button>
                </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
