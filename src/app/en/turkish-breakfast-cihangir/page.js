import { redirect } from "next/navigation";

export const metadata = {
  title: "Authentic Turkish Breakfast in Cihangir, Istanbul | Kardeşler Kebap & Breakfast",
  description:
    "Start your Istanbul morning with a traditional Serpme Kahvaltı spread at Kardeşler Cihangir. Near Taksim Square.",
  alternates: {
    canonical: "https://kardeslercihangir.com/turkish-breakfast-cihangir",
  },
};

// /en/turkish-breakfast-cihangir → permanent redirect to canonical
export default function EnBreakfastRedirect() {
  redirect("/turkish-breakfast-cihangir");
}
