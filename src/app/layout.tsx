import { Metadata } from "next";
import "./globals.css";

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
      <body className="bg-zinc-950 text-zinc-50 antialiased">{children}</body>
    </html>
  );
}
