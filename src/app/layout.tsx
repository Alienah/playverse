import { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../styles/globals.css";
import clsx from "clsx";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PlayVerse",
  description: "Interactive games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={clsx(
          manrope.variable,
          "min-h-screen bg-background text-text-primary antialiased",
        )}
      >
        {children}
      </body>
    </html>
  );
}
