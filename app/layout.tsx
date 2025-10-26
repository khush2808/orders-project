import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trading Order Form",
  description: "A simple trading order form built with Next.js, MobX, and React Hook Form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
