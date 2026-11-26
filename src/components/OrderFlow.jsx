"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";
import PortionSelector from "./PortionSelector";
import { useMounted } from "../hooks/useMounted";
import Image from "next/image";
import { ClipboardList, X, Plus, Minus, Trash2, MessageCircle, Check, CheckCircle, MapPin, ChevronDown, ChevronUp, Phone } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { buildWhatsAppOrderUrl } from "../lib/whatsappOrder";
import { trackEvent } from "../lib/trackingUtils";

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

  const portionLabels = t.portions || {};

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
  // one path per mode. Persisted like the payment method, default
  // "delivery" (the online flow is the site's primary use).
  const MODE_STORAGE_KEY = "kardesler_order_mode";
  const [orderMode, setOrderModeState] = useState("delivery");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(MODE_STORAGE_KEY);
      if (saved === "dinein" || saved === "delivery") setOrderModeState(saved);
    } catch {}
  }, []);
  const setOrderMode = (value) => {
    setOrderModeState(value);
    try {
      localStorage.setItem(MODE_STORAGE_KEY, value);
    } catch {}
  };
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
  const EMPTY_ADDRESS = { name: "", district: "", neighborhood: "", details: "", note: "" };
  const [address, setAddressState] = useState(EMPTY_ADDRESS);
  // Expanded by default: the address form sits directly under the cart
  // items (before the order button in the sticky footer) and must be
  // reachable without hunting — owner UX fix 2026-11-26. Still
  // collapsible via the section header for returning customers whose
  // saved address is already complete.
  const [addressOpen, setAddressOpen] = useState(true);
  const [orderAttempted, setOrderAttempted] = useState(false);
  const [minAttempted, setMinAttempted] = useState(false);
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
          note: saved.note || "",
        });
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist in the setter (same pattern as the payment method) so the
  // initial empty state can never overwrite a saved address on mount.
  const setAddress = (patch) => {
    setAddressState((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
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
  const fullAddress = [DELIVERY_CITY, address.district, address.neighborhood.trim(), address.details.trim()]
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
  const whatsappUrl = pricesLoading
    ? null
    : buildWhatsAppOrderUrl({
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
      });
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

            {/* List Items */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 bg-[#EDE3CE]/30">
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
                        <div className={`flex flex-wrap gap-2 ${orderAttempted && addressErrors.district ? "rounded-lg ring-2 ring-[#A0422E]/50 p-1 -m-1" : ""}`}>
                          {DELIVERY_DISTRICTS.map((d, i) => {
                            const active = address.district === d;
                            return (
                              <button
                                key={d}
                                ref={i === 0 ? districtChipsRef : undefined}
                                type="button"
                                aria-pressed={active}
                                onClick={() => setAddress({ district: d })}
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
                          onChange={(e) => setAddress({ name: e.target.value })}
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

                      {/* Neighborhood (Mahalle) */}
                      <div>
                        <label className="block text-[11px] font-bold text-[#7A7364] mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                          {labels.neighborhoodLabel || "Neighborhood"}
                        </label>
                        <input
                          ref={neighborhoodInputRef}
                          type="text"
                          value={address.neighborhood}
                          autoComplete="address-level3"
                          onChange={(e) => setAddress({ neighborhood: e.target.value })}
                          placeholder={labels.neighborhoodPlaceholder || ""}
                          className={`w-full rounded-lg border bg-[#FAF7F0] px-3 py-2.5 text-sm text-[#2B2620] outline-none focus:border-[#9C7A3F] ${
                            orderAttempted && addressErrors.neighborhood ? "border-[#A0422E]/70" : "border-[#9C7A3F]/30"
                          }`}
                          style={{ fontFamily: "var(--font-inter)" }}
                        />
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
                          onChange={(e) => setAddress({ details: e.target.value })}
                          placeholder={labels.detailsPlaceholder || ""}
                          rows={3}
                          className={`w-full rounded-lg border bg-[#FAF7F0] px-3 py-2.5 text-sm text-[#2B2620] outline-none focus:border-[#9C7A3F] resize-none ${
                            orderAttempted && addressErrors.details ? "border-[#A0422E]/70" : "border-[#9C7A3F]/30"
                          }`}
                          style={{ fontFamily: "var(--font-inter)" }}
                        />
                        {orderAttempted && addressErrors.details && (
                          <p className="text-[11px] text-[#A0422E] mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                            {labels.fieldRequired || "This field is required"}
                          </p>
                        )}
                      </div>

                      {/* Note — optional */}
                      <div>
                        <label className="block text-[11px] font-bold text-[#7A7364] mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                          {labels.noteLabel || "Note (optional)"}
                        </label>
                        <textarea
                          value={address.note}
                          onChange={(e) => setAddress({ note: e.target.value })}
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

            {/* Footer — sticky checkout actions (shrink-0 sibling of the
                scroll area, so total → payment → WhatsApp order button
                stays visible while items + address form scroll above) */}
            {cart.length > 0 && (
              <div className="px-5 py-3 border-t border-[#9C7A3F]/20 bg-[#FAF7F0] space-y-3 shrink-0">
                
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
                {/* Payment Method (at the door) */}
                <div className="space-y-1.5">
                  <p className="text-center text-[#7A7364] text-xs font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                    {labels.paymentMethod || "Payment Method"}
                  </p>
                  <div
                    role="radiogroup"
                    aria-label={labels.paymentMethod || "Payment Method"}
                    className="flex items-stretch gap-2"
                  >
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
                          className={`flex-1 flex items-center gap-2 rounded-lg border-[1.5px] px-3 py-2.5 text-start transition-all duration-200 active:scale-[0.98] ${
                            active
                              ? "border-[#4E5F4C] bg-[#4E5F4C]/5"
                              : "border-[#9C7A3F]/30 bg-white hover:border-[#4E5F4C]/50"
                          }`}
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          <span
                            className={`w-[18px] h-[18px] shrink-0 rounded-[5px] border-[1.5px] flex items-center justify-center transition-all duration-200 ${
                              active
                                ? "bg-[#4E5F4C] border-[#4E5F4C]"
                                : "bg-transparent border-[#7A7364]/50"
                            }`}
                          >
                            {active && <Check size={14} strokeWidth={3} className="text-white" />}
                          </span>
                          <span className={`text-xs whitespace-nowrap ${active ? "font-semibold text-[#2B2620]" : "font-normal text-[#2B2620]/70"}`}>
                            {opt.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
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
                    }}
                    className="w-full py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#1EB856] text-white font-bold text-base tracking-wide flex items-center justify-center gap-3 transition-colors shadow-lg mt-2"
                    style={{ fontFamily: "var(--font-cairo)" }}
                  >
                    <WhatsAppIcon size={22} />
                    {/* Smart label: while the address is incomplete the
                        button itself says what is missing; once the
                        address is saved it becomes the order action. */}
                    <span>{addressComplete ? (wa.button || "Order via WhatsApp") : (labels.addAddressFirst || wa.button || "Order via WhatsApp")}</span>
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
                    href="tel:+902122513696"
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
