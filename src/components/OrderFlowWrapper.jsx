"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const OrderFlow = dynamic(() => import("./OrderFlow"), { ssr: false });

export default function OrderFlowWrapper() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin") || pathname?.includes("/admin/")) {
    return null;
  }

  return <OrderFlow />;
}
