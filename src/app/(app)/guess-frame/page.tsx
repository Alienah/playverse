import Link from "next/link";

export default function GuessFramePage() {
  return (
    <>
      <section className="max-w-3xl">
        <p className="text-compact-01 text-text-muted">Categoría</p>

        <h1 className="mt-8 text-heading-02">GuessFrame</h1>

        <p className="mt-16 text-body-01">
          Escucha fragmentos de audio y trata de adivinar a qué momento
          pertenecen antes de revelar la respuesta.
        </p>
      </section>

      <section className="mt-40 pb-48" aria-label="Juegos de GuessFrame">
        <ul className="grid gap-24">
          <li>
            <article className="rounded-2xl border border-border-soft bg-surface p-24 shadow-md backdrop-blur-sm">
              <p className="text-compact-02 text-text-muted">
                Juego disponible
              </p>

              <h2 className="mt-8 text-heading-03">Heated Rivalry</h2>

              <p className="mt-12 text-body-02">
                Un juego basado en canciones y escenas. Tendrás que identificar
                en qué escena concreta suena cada fragmento.
              </p>

              <Link
                href="/guess-frame/hr"
                className="link mt-16 inline-flex items-center gap-8"
              >
                Ver juego <span aria-hidden="true">→</span>
              </Link>
            </article>
          </li>
        </ul>
      </section>
    </>
  );
}
