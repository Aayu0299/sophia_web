import { Inter } from "next/font/google";
import "../globals.css";
import ReduxProvider from "../redux/reduxProvider";
import { TextProvider } from "../context/TextContext";
import CommonLayout from "../components/layout/CommonLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "SOPHIA",
  description: "SOPHIA Healthcare Project.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ReduxProvider>
          <TextProvider>
            <CommonLayout>{children}</CommonLayout>
          </TextProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
