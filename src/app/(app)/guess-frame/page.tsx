import FeatureCard from "@/components/FeatureCard";

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
            <FeatureCard
              title="Heated Rivalry"
              eyebrow="Juego disponible"
              link={{ href: "/guess-frame/hr" }}
              ctaLabel="Ver juego"
            >
              Un juego basado en canciones y escenas. Tendrás que identificar en
              qué escena concreta suena cada fragmento.
            </FeatureCard>
          </li>
        </ul>
      </section>
    </>
  );
}
