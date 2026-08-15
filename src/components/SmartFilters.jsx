"use client";

import React from "react";
import { X } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function SmartFilters({ activeFilter, setActiveFilter }) {
  const { t } = useAppContext();

  const filterLabels = {
    signature: t.signature || "Signature",
    vegetarian: t.vegetarian || "Vegetarian",
    spicy: t.spicy || "Spicy"
  };

  const filters = [
    { id: "signature", label: filterLabels.signature },
    { id: "vegetarian", label: filterLabels.vegetarian },
    { id: "spicy", label: filterLabels.spicy },
    { id: "vegan", label: t.vegan || "Vegan" },
  ];

  return (
    <div className="px-4 py-3 flex flex-wrap items-center gap-2 bg-transparent">
      {filters.map((f) => {
        const isActive = activeFilter === f.id;

        return (
          <button
            key={f.id}
            onClick={() => setActiveFilter(isActive ? null : f.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors border ${
              isActive 
                ? "bg-[#4E5F4C] text-white border-[#4E5F4C]" 
                : "bg-[#F7F2E7] border-[#9C7A3F]/30 text-[#2B2620] hover:border-[#9C7A3F]"
            }`}
          >
            <span>{f.label}</span>
            {isActive && <X size={12} className="ms-1 opacity-80" />}
          </button>
        );
      })}
    </div>
  );
}
