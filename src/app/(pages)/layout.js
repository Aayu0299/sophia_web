import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import ReduxProvider from "../redux/reduxProvider";
import { TextProvider } from "../context/TextContext";
import CommonLayout from "../components/layout/CommonLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SOPHIA",
  description: "SOPHIA Healthcare Project.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        <ReduxProvider>
          <TextProvider>
            <CommonLayout>{children}</CommonLayout>
          </TextProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
