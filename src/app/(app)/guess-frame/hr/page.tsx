import Image from "next/image";
import leadspaceImage from "./_images/hr-leadspace.jpeg";
import { Progress } from "@/components/Progress";
import { Checkbox } from "@/components/Checkbox";
import { Expand, Play } from "lucide-react";
import Button from "@/components/Button";
import Tag from "@/components/Tag";
import ChallengeListItem from "./ChallengeListItem";
import Panel from "@/components/Panel";

const totalChallenges = 4;
const completedChallenges = 1;
const progressValue = (completedChallenges / totalChallenges) * 100;

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

      <Panel aria-labelledby="progress-id">
        <div className="flex flex-col gap-12">
          <div className="flex flex-wrap items-center justify-between gap-12">
            <div>
              <h2 className="text-heading-03" id="progress-id">
                Progreso
              </h2>
              <p className="mt-8 text-body-02 text-text-secondary">
                Has completado {completedChallenges} de {totalChallenges}{" "}
                pruebas.
              </p>
            </div>

            <p className="text-compact-01 text-text-muted">
              {Math.round(progressValue)}%
            </p>
          </div>

          <Progress value={progressValue} />
        </div>
      </Panel>

      <section
        className="grid gap-24 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start"
        aria-label="Juego"
      >
        <Panel asChild>
          <article>
            <div className="flex flex-col gap-40 lg:gap-64">
              <div>
                <div className="flex flex-col gap-16">
                  <div className="flex flex-wrap items-center gap-8">
                    <Tag tone="active">Prueba activa</Tag>
                    <Tag tone="subtle">Pendiente</Tag>
                    <Tag tone="warning">Medium · 2 puntos</Tag>
                  </div>

                  <div className="flex flex-col gap-8">
                    <h2 className="text-heading-03">Prueba 01</h2>

                    <p className="text-body-02 text-text-secondary">
                      ¿En qué escena aparece este fragmento?
                    </p>
                  </div>
                </div>

                <div className="mt-24 rounded-24 border border-border-soft bg-background/60 p-24">
                  <div className="flex flex-col gap-16">
                    <div className="flex flex-wrap items-start justify-between gap-16">
                      <div>
                        <p className="text-compact-02 text-text-muted">
                          Fragmento de audio
                        </p>

                        <p className="mt-4 text-body-02 text-text-secondary">
                          Duración aproximada: 00:30
                        </p>
                      </div>

                      <Button
                        type="button"
                        kind="inverse"
                        size="icon"
                        aria-label="Reproducir audio"
                      >
                        <Play className="size-16" />
                      </Button>
                    </div>

                    <div className="h-8 overflow-hidden rounded-full bg-background-soft">
                      <div className="h-full w-[32%] rounded-full bg-accent" />
                    </div>

                    <div className="mt-8 inline-flex items-center gap-12">
                      <Checkbox id="challenge-listened" />
                      <label
                        htmlFor="challenge-listened"
                        className="text-compact-01 text-text-primary"
                      >
                        Marcar como escuchada
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-24 flex flex-wrap gap-12">
                  <Button type="button">Mostrar escena</Button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-16">
                  <div>
                    <h3 className="text-heading-03">Respuesta</h3>
                    <p className="mt-8 text-body-02 text-text-secondary">
                      Aquí aparecerá el vídeo asociado cuando reveles la escena.
                    </p>
                  </div>

                  <Button
                    type="button"
                    kind="inverse"
                    size="icon"
                    aria-label="Ver vídeo en pantalla completa"
                  >
                    <Expand className="size-16" />
                  </Button>
                </div>

                <div className="mt-24 flex aspect-video items-center justify-center rounded-24 bg-layer px-24 text-center">
                  <p className="text-body-02 text-text-inverse">
                    Zona reservada para el vídeo de la escena.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </Panel>

        <Panel asChild>
          <aside>
            <div className="flex items-start justify-between gap-16">
              <div>
                <h2 className="text-heading-03">Pruebas</h2>
                <p className="mt-8 text-body-02 text-text-secondary">
                  Selecciona una prueba o continúa con la actual.
                </p>
              </div>

              <Button type="button" kind="secondary" size="sm">
                Reset
              </Button>
            </div>

            <ul className="mt-24 flex flex-col gap-12">
              <li>
                <ChallengeListItem label="Prueba 01" status="active" />
              </li>

              <li>
                <ChallengeListItem label="Prueba 02" status="pending" />
              </li>

              <li>
                <ChallengeListItem label="Prueba 03" status="pending" />
              </li>

              <li>
                <ChallengeListItem label="Prueba 04" status="pending" />
              </li>
            </ul>
          </aside>
        </Panel>
      </section>
    </div>
  );
}
