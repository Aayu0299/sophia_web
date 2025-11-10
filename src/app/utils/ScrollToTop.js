"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top after route changes
    const scrollToTop = () => {
      // Small timeout ensures scroll happens *after* Next.js restores previous position
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }, 50);
    };

    // Run on route change
    scrollToTop();

    // Handle browser back/forward buttons
    window.addEventListener("popstate", scrollToTop);

    return () => {
      window.removeEventListener("popstate", scrollToTop);
    };
  }, [pathname]);

  return null;
}
