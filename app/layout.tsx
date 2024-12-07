import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paradox Inversion Press",
  description:
    "Paradox Inversion Press is the home of creative works by Jedai Saboteur",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
