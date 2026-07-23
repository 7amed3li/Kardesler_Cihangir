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
  ];

  return (
    <div className="px-4 py-3 flex flex-wrap items-center gap-2 bg-transparent">
      {filters.map((f) => {
        const isActive = activeFilter === f.id;

        return (
          <button
            key={f.id}
            onClick={() => setActiveFilter(isActive ? null : f.id)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded text-xs font-medium tracking-wider uppercase transition-all duration-300 border ${
              isActive 
                ? "bg-teal text-cream border-teal" 
                : "bg-transparent border-teal-dim/50 text-cream-dim hover:border-teal hover:text-cream"
            }`}
          >
            <span>{f.label}</span>
            {isActive && <X size={12} className="ms-1 opacity-60" />}
          </button>
        );
      })}
    </div>
  );
}
