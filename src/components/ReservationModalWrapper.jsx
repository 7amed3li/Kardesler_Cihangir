"use client";

import React from "react";
import { useAppContext } from "@/context/AppContext";
import ReservationModal from "./ReservationModal";

// Global mount point for the reservation modal — open state lives in
// AppContext (same pattern as the cart drawer), so the header, the mobile
// sticky bar and page sections can all open it.
export default function ReservationModalWrapper() {
  const { isReservationOpen, setIsReservationOpen } = useAppContext();
  return (
    <ReservationModal
      isOpen={isReservationOpen}
      onClose={() => setIsReservationOpen(false)}
    />
  );
}
