import "./globals.css";
import type { Metadata } from "next";
import Logo from "@/components/Logo";
import MainFooter from "@/components/MainFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://paradoxinversion.com"),
  title: "Paradox Inversion Press",
  description:
    "Paradox Inversion Press is the home of creative works by Jedai Saboteur",
  creator: "Jedai Saboteur",
  publisher: "Jedai Saboteur",
  authors: [{ name: "Jedai Saboteur" }],
  keywords: [
    "Paradox Inversion Press",
    "Jedai Saboteur",
    "blog",
    "fiction",
    "writing",
    "games",
    "The Neon Circuit",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Logo />
        <main>{children}</main>
        <MainFooter />
      </body>
    </html>
  );
}
