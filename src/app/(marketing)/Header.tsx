import Link from "next/link";
import Image from "next/image";
import logo from "../logo.png";

export default function Header() {
  return (
    <header>
      <div className="mx-auto max-w-1200 px-24 py-24 flex items-center justify-center">
        <Link href="/" className="text-heading-03 font-semibold">
          <Image
            src={logo}
            alt="PlayVerse"
            priority
            className="h-auto w-220 sm:w-300 lg:w-400"
          />
        </Link>
      </div>
    </header>
  );
}
