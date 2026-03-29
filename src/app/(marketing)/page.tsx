import Button from "@/components/Button";
import FeatureCard from "@/components/FeatureCard";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="text-heading-01">Juegos para compartir momentos</h1>

        <p className="mt-16 text-body-01">
          Una colección de juegos donde tendrás que adivinar escenas, momentos y
          emociones.
        </p>

        <div className="mt-24">
          <Button asChild>
            <Link href="/guess-frame">Explorar juegos</Link>
          </Button>
        </div>
      </section>

      <section className="mt-48 pb-48">
        <h2 className="mb-40 text-heading-02 lg:mb-64">Categorías</h2>

        <ul className="grid gap-24">
          <li>
            <FeatureCard title="GuessFrame" link={{ href: "/guess-frame" }}>
              Escucha fragmentos y adivina en qué momento ocurren.
            </FeatureCard>
          </li>
        </ul>
      </section>
    </>
  );
}
