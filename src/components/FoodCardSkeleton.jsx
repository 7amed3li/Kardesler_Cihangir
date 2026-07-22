"use client";

import React from "react";

export default function FoodCardSkeleton({ isVertical = false }) {
  return (
    <div
      className={`glass-card rounded-2xl p-4 border border-teal-dim/20 overflow-hidden relative animate-pulse ${
        isVertical ? "flex flex-col h-[380px]" : "flex gap-4 items-center"
      }`}
    >
      {/* Shimmer sweep effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gold/10 to-transparent pointer-events-none" />

      {/* Image Skeleton */}
      <div
        className={`bg-ink-2/80 rounded-xl relative overflow-hidden shrink-0 border border-teal-dim/10 ${
          isVertical ? "w-full h-48 mb-3" : "w-24 h-24 sm:w-28 sm:h-28"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-copper/10 via-gold/5 to-transparent" />
      </div>

      {/* Details Skeleton */}
      <div className="flex-1 min-w-0 space-y-2.5 w-full">
        {/* Title skeleton */}
        <div className="h-4 bg-cream/10 rounded-md w-3/4" />
        
        {/* Description skeleton */}
        <div className="h-3 bg-cream/5 rounded-md w-full" />
        <div className="h-3 bg-cream/5 rounded-md w-2/3" />

        {/* Price & Action skeleton */}
        <div className="pt-2 flex items-center justify-between">
          <div className="h-5 bg-copper/20 rounded-md w-20" />
          <div className="w-8 h-8 rounded-full bg-teal-dim/20" />
        </div>
      </div>
    </div>
  );
}
