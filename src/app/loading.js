import React from "react";
import FoodCardSkeleton from "@/components/FoodCardSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-ink text-cream p-4 space-y-8 animate-fadeIn">
      {/* Hero Skeleton Header */}
      <div className="max-w-3xl mx-auto text-center pt-8 space-y-4">
        <div className="w-40 h-6 bg-teal-dim/20 rounded-full mx-auto animate-pulse" />
        <div className="w-64 sm:w-80 h-12 bg-gold/15 rounded-2xl mx-auto animate-pulse" />
        <div className="w-48 h-4 bg-copper/20 rounded-md mx-auto animate-pulse" />
      </div>

      {/* Ottoman Divider Skeleton */}
      <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto" />

      {/* Menu Cards Skeletons */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <FoodCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
