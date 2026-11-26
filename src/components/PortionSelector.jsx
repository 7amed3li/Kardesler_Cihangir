"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import { getPortionOptions } from "../lib/portions";

/**
 * Segmented portion selector (research decision: on the menu item card
 * itself, repeated inside the cart so a portion can be changed there).
 * Options come from src/lib/portions.js — soups get [Yarım | Tam],
 * most dishes get [1 | 1,5 Porsiyon | Duble], and breakfast dishes get
 * no options at all, in which case this component renders nothing.
 *
 * `size="sm"` is the compact variant used on cart lines.
 *
 * `labelsOverride` replaces the localized labels when given — the
 * cart passes the Turkish labels (kitchen language, owner ruling:
 * cart portions are always Turkish, in every UI locale). Menu
 * callers omit it and keep the active locale's labels.
 */
export default function PortionSelector({ itemId, value, onChange, size = "md", labelsOverride }) {
  const { t } = useAppContext();
  const labels = labelsOverride || t.portions || {};
  const options = getPortionOptions(itemId);

  // No portion options for this dish (e.g. breakfast) — render nothing.
  if (options.length === 0) return null;

  const fallback = {
    half: "Yarım",
    full: "1 Porsiyon",
    oneHalf: "1,5 Porsiyon",
    double: "Duble",
  };

  const isSmall = size === "sm";

  return (
    <div
      role="radiogroup"
      aria-label={labels.label || "Porsiyon"}
      className={`inline-flex items-center rounded-lg border border-[#9C7A3F]/30 bg-[#EDE3CE] p-0.5 gap-0.5 ${
        isSmall ? "max-w-full flex-wrap" : ""
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {options.map((opt) => {
        const active = value === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={(e) => {
              e.stopPropagation();
              onChange(opt.key);
            }}
            className={`rounded-md font-bold whitespace-nowrap transition-colors ${
              isSmall ? "px-2 py-1 text-[10px]" : "px-2.5 py-1.5 text-[11px]"
            } ${
              active
                ? "bg-[#9C7A3F] text-white shadow-sm"
                : "text-[#2B2620]/60 hover:text-[#2B2620] hover:bg-[#9C7A3F]/10"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {labels[opt.key] || fallback[opt.key]}
          </button>
        );
      })}
    </div>
  );
}
