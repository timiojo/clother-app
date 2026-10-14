import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dej. by Ayodeji — Bespoke Formalwear",
  description:
    "Bespoke dresses, tailored suits and occasion wear. Consultations, quotes and projects in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
