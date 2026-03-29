import Image from "next/image";
import Link from "next/link";
import logo from "./logo.png";

export default function HomePage() {
  return (
    <main className="bg-background text-text-primary">
      <header className="flex items-center justify-center px-24 py-24">
        <Image
          src={logo}
          alt="PlayVerse logo"
          priority
          className="h-auto w-220 sm:w-300 lg:w-400"
        />
      </header>

      <section className="mx-auto max-w-3xl px-24 text-center">
        <h1 className="text-heading-01">Juegos para compartir momentos</h1>

        <p className="text-body-01 mt-16">
          Una colección de juegos donde tendrás que adivinar escenas, momentos y
          emociones.
        </p>

        <div className="mt-24">
          <Link
            href="/guess-frame"
            className="inline-flex items-center rounded bg-accent px-24 py-12 font-semibold text-text-primary transition hover:brightness-110"
          >
            Explorar juegos
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-48 max-w-960 px-24 pb-48">
        <h2 className="text-heading-02 mb-40 lg:mb-64">Categorías</h2>
        <ul>
          <li>
            <article className="rounded-2xl border border-border-soft bg-surface p-24 shadow-md backdrop-blur-sm">
              <h3 className="text-heading-03">GuessFrame</h3>

              <p className="text-body-02 mt-12">
                Escucha fragmentos y adivina en qué momento ocurren.
              </p>

              <Link
                href="/guess-frame"
                className="link mt-16 inline-flex items-center gap-8"
              >
                Entrar <span aria-hidden="true">→</span>
              </Link>
            </article>
          </li>
        </ul>
      </section>
    </main>
  );
}
