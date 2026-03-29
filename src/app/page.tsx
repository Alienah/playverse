import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/logo.png";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#BFE1F3] text-[#0F172A]">
      {/* HEADER */}
      <header className="flex items-center justify-center py-6">
        <Image src={logo} alt="PlayVerse logo" width={300} priority />
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Juegos para compartir momentos
        </h1>

        <p className="mt-4 text-[#1E293B]">
          Una colección de juegos donde tendrás que adivinar escenas, momentos y
          emociones.
        </p>

        <div className="mt-6">
          <Link
            href="/guess-frame"
            className="inline-flex items-center rounded-lg bg-[#F59E0B] px-6 py-3 font-medium text-[#0F172A] hover:brightness-110"
          >
            Explorar juegos
          </Link>
        </div>
      </section>

      {/* CATEGORY CARD */}
      <section className="mx-auto mt-16 max-w-4xl px-6">
        <div className="rounded-2xl bg-white/70 p-6 shadow-md backdrop-blur">
          <h2 className="text-2xl font-semibold">GuessFrame</h2>

          <p className="mt-2 text-[#1E293B]">
            Escucha fragmentos y adivina en qué momento ocurren.
          </p>

          <Link
            href="/guess-frame"
            className="mt-4 inline-block text-sm font-medium text-slate-deep transition hover:underline hover:underline-offset-4"
          >
            Entrar →
          </Link>
        </div>
      </section>
    </main>
  );
}
