"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import PortionSelector from "./PortionSelector";
import { useMounted } from "../hooks/useMounted";
import Image from "next/image";
import { ClipboardList, X, Plus, Minus, Trash2, MessageCircle, CheckCircle, MapPin, ChevronDown } from "lucide-react";
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

  // Delivery address (mandatory for WhatsApp orders). The whole form is
  // persisted next to the cart (kardesler_cart) so returning customers are
  // prefilled; every keystroke saves, so edits and completed orders alike
  // update the saved address. City is fixed to İstanbul — the restaurant
  // only delivers there — and the district is one of the 5 delivery areas.
  const ADDRESS_STORAGE_KEY = "kardesler_address";
  const DELIVERY_CITY = "İstanbul";
  const DELIVERY_DISTRICTS = ["Beyoğlu", "Şişli", "Beşiktaş", "Fatih", "Üsküdar"];
  const EMPTY_ADDRESS = { name: "", phone: "", district: "", neighborhood: "", details: "", note: "" };
  const [address, setAddressState] = useState(EMPTY_ADDRESS);
  const [addressOpen, setAddressOpen] = useState(false);
  const [orderAttempted, setOrderAttempted] = useState(false);
  const addressSectionRef = useRef(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(ADDRESS_STORAGE_KEY) || "null");
      if (saved && typeof saved === "object") {
        setAddressState({
          name: saved.name || "",
          phone: saved.phone || "",
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

  // Required: name, phone (>= 10 digits after stripping formatting),
  // district, neighborhood, address details. Note is optional.
  const addressErrors = {
    name: !address.name.trim(),
    phone: address.phone.replace(/\D/g, "").length < 10,
    district: !DELIVERY_DISTRICTS.includes(address.district),
    neighborhood: !address.neighborhood.trim(),
    details: !address.details.trim(),
  };
  const addressComplete = !Object.values(addressErrors).some(Boolean);
  const fullAddress = [DELIVERY_CITY, address.district, address.neighborhood.trim(), address.details.trim()]
    .filter(Boolean)
    .join(" / ");

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
          phone: wa.phone || "Phone",
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
          phone: address.phone.trim(),
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
            className="bg-[#FAF7F0] w-full sm:max-w-md sm:h-full max-h-[90vh] sm:max-h-full rounded-t-3xl sm:rounded-none overflow-hidden flex flex-col shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#9C7A3F]/20 shrink-0 bg-[#F7F2E7]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#9C7A3F]/15 flex items-center justify-center">
                  <ClipboardList size={18} className="text-[#9C7A3F]" />
                </div>
                <h2 className="text-xl font-bold text-[#2B2620]" style={{ fontFamily: "var(--font-cairo)" }}>
                  {listTitle}
                </h2>
                {cartCount > 0 && (
                  <span className="text-sm text-[#7A7364] font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                    ({cartCount})
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                aria-label={t.close || "Close"}
                className="w-8 h-8 rounded-full bg-[#EDE3CE] flex items-center justify-center text-[#2B2620] hover:bg-[#9C7A3F] hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Waiter Prominent Instruction */}
            <div className="bg-[#4E5F4C] text-white px-6 py-3 text-center shrink-0 shadow-sm z-10">
              <p className="font-bold text-sm sm:text-base leading-tight" style={{ fontFamily: "var(--font-cairo)" }}>
                {waiterText}
              </p>
            </div>

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

              {/* Delivery Address (mandatory for WhatsApp orders) */}
              {cart.length > 0 && (
                <div ref={addressSectionRef} className="mt-4 rounded-xl bg-white border border-[#9C7A3F]/15 shadow-sm overflow-hidden">
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
                            • {address.district} / {address.neighborhood.trim()}
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

                      {[
                        { key: "name", label: labels.nameLabel || "Name", placeholder: labels.namePlaceholder || "", autoComplete: "name", type: "text" },
                        { key: "phone", label: labels.phoneLabel || "Phone", placeholder: labels.phonePlaceholder || "", autoComplete: "tel", type: "tel" },
                      ].map((f) => (
                        <div key={f.key}>
                          <label className="block text-[11px] font-bold text-[#7A7364] mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                            {f.label}
                          </label>
                          <input
                            type={f.type}
                            value={address[f.key]}
                            autoComplete={f.autoComplete}
                            inputMode={f.key === "phone" ? "tel" : undefined}
                            onChange={(e) => setAddress({ [f.key]: e.target.value })}
                            placeholder={f.placeholder}
                            className={`w-full rounded-lg border bg-[#FAF7F0] px-3 py-2.5 text-sm text-[#2B2620] outline-none focus:border-[#9C7A3F] ${
                              orderAttempted && addressErrors[f.key] ? "border-[#A0422E]/70" : "border-[#9C7A3F]/30"
                            }`}
                            style={{ fontFamily: "var(--font-inter)" }}
                          />
                          {orderAttempted && addressErrors[f.key] && (
                            <p className="text-[11px] text-[#A0422E] mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                              {f.key === "phone"
                                ? labels.phoneInvalid || "Enter a valid phone number"
                                : labels.fieldRequired || "This field is required"}
                            </p>
                          )}
                        </div>
                      ))}

                      {/* City — fixed to İstanbul, locked */}
                      <div>
                        <label className="block text-[11px] font-bold text-[#7A7364] mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                          {labels.cityLabel || "City"}
                        </label>
                        <input
                          type="text"
                          value={DELIVERY_CITY}
                          disabled
                          readOnly
                          className="w-full rounded-lg border border-[#9C7A3F]/20 bg-[#EDE3CE]/60 px-3 py-2.5 text-sm text-[#7A7364] outline-none cursor-not-allowed"
                          style={{ fontFamily: "var(--font-inter)" }}
                        />
                      </div>

                      {/* District — one of the 5 delivery districts */}
                      <div>
                        <label className="block text-[11px] font-bold text-[#7A7364] mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                          {labels.districtLabel || "District"}
                        </label>
                        <select
                          value={address.district}
                          onChange={(e) => setAddress({ district: e.target.value })}
                          className={`w-full rounded-lg border bg-[#FAF7F0] px-3 py-2.5 text-sm text-[#2B2620] outline-none focus:border-[#9C7A3F] ${
                            orderAttempted && addressErrors.district ? "border-[#A0422E]/70" : "border-[#9C7A3F]/30"
                          }`}
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          <option value="">{labels.districtPlaceholder || "Select district"}</option>
                          {DELIVERY_DISTRICTS.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                        {orderAttempted && addressErrors.district && (
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
                          value={address.details}
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
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer — Actions */}
            {cart.length > 0 && (
              <div className="px-5 py-4 border-t border-[#9C7A3F]/20 bg-[#FAF7F0] space-y-3 shrink-0">
                
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

                {/* Payment Method (at the door) */}
                <div className="space-y-1.5">
                  <p className="text-center text-[#7A7364] text-xs font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                    {labels.paymentMethod || "Payment Method"}
                  </p>
                  <div
                    role="radiogroup"
                    aria-label={labels.paymentMethod || "Payment Method"}
                    className="flex items-center rounded-lg border border-[#9C7A3F]/30 bg-[#EDE3CE] p-0.5 gap-0.5"
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
                          className={`flex-1 rounded-md px-2.5 py-2 text-xs font-bold whitespace-nowrap transition-colors ${
                            active
                              ? "bg-[#9C7A3F] text-white shadow-sm"
                              : "text-[#2B2620]/60 hover:text-[#2B2620] hover:bg-[#9C7A3F]/10"
                          }`}
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {opt.text}
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
                      // open the address form and point at what's missing.
                      if (!addressComplete) {
                        e.preventDefault();
                        setOrderAttempted(true);
                        setAddressOpen(true);
                        setTimeout(() => {
                          addressSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                        }, 60);
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
                    <span>{wa.button || "Order via WhatsApp"}</span>
                  </a>
                )}

                {/* Call to Order Button */}
                <a
                  href="tel:+902122513696"
                  className="w-full py-4 px-6 rounded-xl bg-[#4E5F4C] hover:bg-[#3D4B3B] text-[#EAF0E6] font-bold text-base tracking-wider uppercase flex items-center justify-center gap-3 transition-colors shadow-lg mt-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <span>{t.callToOrder || (lang === 'ar' ? 'اتصل للطلب' : lang === 'tr' ? 'Sipariş İçin Ara' : 'Call to Order')}</span>
                </a>

                {/* Clear List */}
                <div className="flex justify-center pt-2 pb-1">
                  <button
                    onClick={clearCart}
                    className="text-[12px] text-[#A0422E] font-medium hover:underline opacity-80"
                  >
                    {labels.clear || "Clear List"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
