import "./globals.css";
import type { Metadata } from "next";

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
        {children}
      </body>
    </html>
  );
}
