"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import { getPortionOptions } from "../lib/portions";

/**
 * Segmented portion selector (research decision: on the menu item card
 * itself, repeated inside the cart so a portion can be changed there).
 * Options come from src/lib/portions.js — soups get [Yarım | Tam],
 * everything else gets [1 | 1,5 Porsiyon | Duble].
 *
 * `size="sm"` is the compact variant used on cart lines.
 */
export default function PortionSelector({ itemId, value, onChange, size = "md" }) {
  const { t } = useAppContext();
  const labels = t.portions || {};
  const options = getPortionOptions(itemId);

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
