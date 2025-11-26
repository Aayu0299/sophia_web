"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderProvider } from "@/app/context/LoaderContext";
import Footer from "./Footer";
import ScrollToTop from "@/app/utils/ScrollToTop";
import { usePathname } from "next/navigation";
import DashboardSidebar from "./DashboardSidebar";
import AuthHeader from "./AuthHeader";
import { useState } from "react";

export default function CommonLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/";

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <LoaderProvider>
        <ScrollToTop />

        {!isLoginPage ? (
          <>
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar (always left) */}
              <DashboardSidebar open={open} setOpen={setOpen} />

              {/* Right side (Header + Content) */}
              <div className="flex flex-col flex-1 overflow-hidden">
                {/* Header ONLY for main content area */}
                <AuthHeader setOpen={setOpen} />

                {/* Page Content */}
                <div
                  className="flex-1 overflow-y-auto bg-(--lightGray) p-[31px]"
                  style={{ scrollbarWidth: "thin" }}
                >
                  {children}
                </div>
              </div>
            </div>

            {/* Footer bottom full width */}
            <Footer />
          </>
        ) : (
          <main className="grow overflow-x-hidden">{children}</main>
        )}

        <ToastContainer />
      </LoaderProvider>
    </div>
  );
}
