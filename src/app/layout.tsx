import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import clsx from "clsx";
import "../styles/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "PlayVerse",
  description: "Interactive games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body
        className={clsx(
          manrope.variable,
          "flex min-h-screen flex-col bg-background text-text-primary antialiased",
        )}
      >
        {children}
      </body>
    </html>
  );
}
