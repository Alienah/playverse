import logoCircle from "./logo-circle.png";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-text-muted border-t border-border-soft">
      <div className="mx-auto max-w-1200 px-24 py-24">
        <div className="flex items-center gap-8 text-helper">
          <Image src={logoCircle} alt="" className="h-40 w-40" />
          PlayVerse
        </div>
      </div>
    </footer>
  );
}
