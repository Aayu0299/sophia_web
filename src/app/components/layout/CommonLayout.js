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
        <main className="grow overflow-x-hidden">{children}</main>
        <Footer />
        <ToastContainer />
      </LoaderProvider>
    </div>
  );
}
