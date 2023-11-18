import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "tailwind-config/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fultime Force!",
  description: "Fulltime Force Challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
