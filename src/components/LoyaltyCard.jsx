"use client";

import React, { useState, useEffect } from "react";
import { Gift, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function LoyaltyCard() {
  const { t } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    // Simulate fetching visits from localStorage (which acts as our user session)
    const storedVisits = parseInt(localStorage.getItem("loyalty_visits") || "0", 10);
    // Auto-increment for demo purposes if it's a new table session
    if (!sessionStorage.getItem("visited_this_session")) {
      const newVisits = storedVisits < 10 ? storedVisits + 1 : 10;
      localStorage.setItem("loyalty_visits", newVisits.toString());
      sessionStorage.setItem("visited_this_session", "true");
      setVisits(newVisits);
    } else {
      setVisits(storedVisits);
    }
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10 backdrop-blur-md"
      >
        <Gift size={20} className="text-[#D4AF37]" />
        <span className="text-sm font-bold text-[#D4AF37] hidden sm:block">
          {visits}/10
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111] border border-[#D4AF37]/30 rounded-3xl p-8 max-w-sm w-full relative shadow-2xl shadow-[#D4AF37]/10">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-tr from-[#D4AF37] to-[#8a6b1c] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#D4AF37]/20">
                <Gift size={32} className="text-black" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{t.loyalty}</h2>
              <p className="text-sm text-gray-400">
                {visits >= 10 
                  ? "Congratulations! You earned a free Künefe!" 
                  : `You are ${10 - visits} visits away from a free Künefe.`}
              </p>
            </div>

            {/* Punch Card Grid */}
            <div className="grid grid-cols-5 gap-3 mb-8">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-xl flex items-center justify-center border-2 transition-all ${
                    i < visits
                      ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]"
                      : "bg-white/5 border-white/10 text-transparent"
                  }`}
                >
                  <Gift size={20} className={i < visits ? "opacity-100" : "opacity-0"} />
                </div>
              ))}
            </div>

            {visits >= 10 && (
              <button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#8a6b1c] text-black font-bold py-3 rounded-xl shadow-lg shadow-[#D4AF37]/20 animate-pulse">
                Claim Reward
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
