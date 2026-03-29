import type { Metadata } from "next";
import { Manrope, Geist } from "next/font/google";
import clsx from "clsx";
import "../styles/globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="es" className={cn("font-sans", geist.variable)}>
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
