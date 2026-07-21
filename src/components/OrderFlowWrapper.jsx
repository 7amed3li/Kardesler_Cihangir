"use client";

import dynamic from "next/dynamic";

const OrderFlow = dynamic(() => import("./OrderFlow"), { ssr: false });

export default function OrderFlowWrapper() {
  return <OrderFlow />;
}
