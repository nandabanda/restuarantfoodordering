import { Suspense } from "react";
import POSPageClient from "./POSPageClient";

export default function POSPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <POSPageClient />
    </Suspense>
  );
}
