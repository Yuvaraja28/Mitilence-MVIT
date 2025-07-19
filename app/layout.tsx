import "./globals.css";
import type { Metadata } from "next";
import { ToastProvider } from "@heroui/toast";
import { HeroUIProvider } from "@heroui/system";
import { Analytics } from "@vercel/analytics/react";
import { FirebaseProvider } from "@/contexts/firebase";
import { SpeedInsights } from "@vercel/speed-insights/next"
import StickyHeader from "@/components/internal/stickyHeader";
import { Alert } from "@heroui/react";

export const metadata: Metadata = {
  title: "Mitilence'25 • MVIT",
  creator: 'Yuvaraja',
  icons: "https://mitilence.1he.dev/icon.png",
  description: "The National Level Technical Symposium, MITILENCE, is a prestigious annual event hosted by our Manakula Vinayagar Institute of Technology. Its primary objective is to ignite students' talents and offer them opportunities to explore the latest technological advancements. MITILENCE provides a platform for students to exhibit their expertise in coding, design, innovation, and problem-solving while also participating in engaging and creative activities. The event showcases a vibrant blend of technical and non-technical competitions, fostering learning, teamwork, and enthusiasm among all participants.",
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
        <div
          className="fixed bottom-5 px-4 left-1/2 -translate-x-1/2 z-50 w-full md:w-fit"
        >
          <Alert
            icon={<span>✨</span>}
            radius="lg"
            color="warning"
            className="font-medium text-base shadow-md shadow-yellow-400 !py-2 px-6"
          >
            <span
              className="text-lg"
            >
              See you at Mitilence 2026!
            </span>
          </Alert>
        </div>
      </body>
    </html>
  );
}
