import "@/app/globals.css";
import { clsx } from "clsx";
import { IBM_Plex_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { icons } from "@/constants/icons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout Flow",
  description: "Accessible checkout flow demo",
  robots: { index: false, follow: false },
  icons,
};

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx(ibmPlexSans.className)}>{children}</body>
    </html>
  );
}
