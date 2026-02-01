import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mitilence '26 | Enhanced Cyberpunk Hub",
  description:
    "The ultimate proving ground. Gear up, operative. Mitilence '26 is the city's premier technical symposium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`tech-floor antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
