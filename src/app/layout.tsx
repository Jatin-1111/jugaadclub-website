import type { Metadata } from "next";
import "./globals.css";
import Commons from "./Commons";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/ComponentExporter";

export const metadata: Metadata = {
  title: "Jugaad - Robotic club of UIET",
  description:
    " Jugaad Club, the premier robotics club of UIET, Panjab University, Chandigarh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Toaster position="bottom-right" />
        {/* <Commons>{children}</Commons> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
