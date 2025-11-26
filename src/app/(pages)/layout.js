import { Inter } from "next/font/google";
import "../globals.css";
import ReduxProvider from "../redux/reduxProvider";
import CommonLayout from "../components/layout/CommonLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "SOPHIA ADMIN",
  description: "SOPHIA Healthcare Project.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ReduxProvider>
          <CommonLayout>{children}</CommonLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
