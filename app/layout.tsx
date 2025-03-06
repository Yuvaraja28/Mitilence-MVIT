import "./globals.css";
import type { Metadata } from "next";
import { ToastProvider } from "@heroui/toast";
import { HeroUIProvider } from "@heroui/system";
import { Analytics } from "@vercel/analytics/react";
import { FirebaseProvider } from "@/contexts/firebase";
import { SpeedInsights } from "@vercel/speed-insights/next"
import StickyHeader from "@/components/internal/stickyHeader";

export const metadata: Metadata = {
  title: "Mitilence • MVIT",
  creator: 'Yuvaraja',
  icons: "https://mitilence.1he.dev/icon.png",
  description: "MITILENCE is the annual national-level technical symposium hosted by Manakula Vinayagar Institute of Technology (MVIT) in Puducherry. This prestigious event serves as a dynamic platform for students across India to showcase their technical acumen, engage in innovative problem-solving, and collaborate with peers from diverse engineering disciplines.",
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#006FEE' },
    { media: '(prefers-color-scheme: dark)', color: '#006FEE' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <HeroUIProvider>
          <div
            className="absolute z-[9999]"
          >
            <ToastProvider
              placement="bottom-right"
              toastOffset={10}
              toastProps={{
                color: "primary",
                variant: "solid",
                timeout: 10000,
                classNames: {
                  title: "text-base font-medium",
                  description: "text-base font-medium",
                },
              }}
            /> 
          </div>
          <Analytics />
          <SpeedInsights />
          <FirebaseProvider>
            <StickyHeader />
            {children}
          </FirebaseProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
