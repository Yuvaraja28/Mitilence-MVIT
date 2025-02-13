import "./globals.css";
import type { Metadata } from "next";
import { HeroUIProvider } from "@heroui/system";
import StickyHeader from "@/components/internal/stickyHeader";

export const metadata: Metadata = {
  title: "Mitilence",
  description: "MVIT Cultural Fest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <HeroUIProvider>
          <StickyHeader />
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}
