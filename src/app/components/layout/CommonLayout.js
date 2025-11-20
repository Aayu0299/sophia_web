"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderProvider } from "@/app/context/LoaderContext";
import Footer from "./Footer";
import ScrollToTop from "@/app/utils/ScrollToTop";
import { usePathname } from "next/navigation";

export default function CommonLayout({ children }) {
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const activeSegment = pathParts[2];

  return (
    <div className="flex flex-col min-h-screen ">
      <LoaderProvider>
        {/* Automatically scrolls to top on route change */}
        <ScrollToTop />
        <main className="grow overflow-x-hidden">{children}</main>
        {activeSegment !== "login" &&
          activeSegment !== "forgot-password" &&
          activeSegment !== "reset-password" &&
          activeSegment !== "sign-up" && <Footer />}
        <ToastContainer />
      </LoaderProvider>
    </div>
  );
}
