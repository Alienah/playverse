import Image from "next/image";
import Link from "next/link";
import logo from "../logo.png";

export default function Header() {
  return (
    <header className="border-b border-border-inverse bg-layer text-text-inverse">
      <div className="mx-auto flex max-w-1200 items-center justify-between px-24 py-16 lg:h-64">
        <Link
          href="/"
          className="inline-flex items-center gap-8 text-compact-01 font-semibold"
        >
          <Image src={logo} alt="PlayVerse" className="h-32 lg:h-48 w-auto" />
        </Link>

        <nav className="flex items-center gap-16" aria-label="Principal">
          <Link href="/guess-frame" className="link-inverse">
            GuessFrame
          </Link>
        </nav>
      </div>
    </header>
  );
}
