import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderProvider } from "@/app/context/LoaderContext";
import Footer from "./Footer";
import ScrollToTop from "@/app/utils/ScrollToTop";

export default function CommonLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen ">
      <LoaderProvider>
        {/* Automatically scrolls to top on route change */}
        <ScrollToTop />
        <main className="grow overflow-x-hidden">{children}</main>
        {/* <Footer /> */}
        <ToastContainer />
      </LoaderProvider>
    </div>
  );
}
