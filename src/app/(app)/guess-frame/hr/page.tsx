import Image from "next/image";

import leadspaceImage from "./_images/hr-leadspace.jpeg";
import { challenges } from "./data";
import { Game } from "./_game/Game";
import { Suspense } from "react";

export default function HeatedRivalryPage() {
  return (
    <div className="flex flex-col gap-40 pb-48">
      <section className="flex flex-col gap-40" aria-labelledby="game-title">
        <div className="max-w-3xl">
          <p className="text-compact-01 text-text-muted">GuessFrame</p>

          <h1 id="game-title" className="mt-8 text-heading-02">
            Heated Rivalry
          </h1>

          <p className="mt-16 text-body-01 text-text-secondary">
            Escucha un fragmento y trata de identificar en qué momento aparece
            esa canción antes de revelar la escena.
          </p>

          <p className="mt-12 text-helper text-text-muted">
            Inspirado en Heated Rivalry. Proyecto privado y no comercial.
          </p>
        </div>

        <div className="overflow-hidden rounded-24 border border-border-soft bg-surface shadow-sm">
          <Image
            src={leadspaceImage}
            alt="Imagen promocional de Heated Rivalry"
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </section>
      <Suspense fallback={<div />}>
        <Game challenges={challenges} />
      </Suspense>
    </div>
  );
}
