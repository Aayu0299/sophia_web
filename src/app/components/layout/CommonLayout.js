"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderProvider } from "@/app/context/LoaderContext";
import Footer from "./Footer";
import Header from "./Header";

export default function CommonLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen ">
      <LoaderProvider>
        <Header />
        <main className="flex-1 container mx-auto p-4">{children}</main>
        <Footer />
        <ToastContainer />
      </LoaderProvider>
    </div>
  );
}
