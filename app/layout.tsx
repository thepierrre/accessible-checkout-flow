import "@/app/globals.css";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "@next/font/google";
import { clsx } from "clsx";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

export { ibmPlexMono };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Checkout Flow</title>
      </head>
      <body className={clsx(ibmPlexSans.className, "mt-8")}>{children}</body>
    </html>
  );
}
