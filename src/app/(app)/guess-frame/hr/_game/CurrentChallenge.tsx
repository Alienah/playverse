import { useEffect, useRef, useState } from "react";

import Panel from "@/components/Panel";
import {
  formatTime,
  getDifficultyTagTone,
  getInstructionContent,
} from "./challengeUtils";
import Button from "@/components/Button";
import Tag from "@/components/Tag";
import { Expand, Pause, Play } from "lucide-react";
import { Progress } from "@/components/Progress";
import { Checkbox } from "@/components/Checkbox";

import { Challenge } from "../types";
import { useGame } from "./GameContext";

type CurrentChallengeProps = {
  challengeId: string;
  challenge: Challenge;
  title: string;
};

export function CurrentChallenge(props: CurrentChallengeProps) {
  const { challengeId, challenge, title } = props;

  const {
    listenedIds,
    revealedIds,
    revealChallenge,
    challengeResults,
    setChallengeResult,
  } = useGame();

  const isListened = listenedIds.includes(challengeId);
  const isRevealed = revealedIds.includes(challengeId);
  const result = challengeResults[challengeId];

  return (
    <Panel asChild>
      <article>
        <div className="flex flex-col gap-40 lg:gap-64">
          <div className="flex flex-col gap-32">
            <div className="flex flex-col gap-16">
              <CurrentChallengeTags
                challenge={challenge}
                isRevealed={isRevealed}
                isListened={isListened}
              />

              <div className="flex flex-col gap-8">
                <h2 className="text-heading-03">{title}</h2>

                <p className="text-body-02 text-text-secondary">
                  {getInstructionContent(challenge.instruction)}
                </p>
              </div>
            </div>

            <CurrentChallengeAudio
              challenge={challenge}
              isListened={isListened}
            />

            <div className="flex flex-col gap-16 sm:flex-row sm:justify-between">
              <Button
                type="button"
                onClick={() => revealChallenge(challengeId)}
              >
                Mostrar escena
              </Button>

              {isRevealed ? (
                <div className="flex flex-wrap gap-8">
                  <Button
                    type="button"
                    size="sm"
                    kind={result === "correct" ? "success" : "secondary"}
                    onClick={() => setChallengeResult(challengeId, "correct")}
                  >
                    Acertada
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    kind={result === "incorrect" ? "danger" : "secondary"}
                    onClick={() => setChallengeResult(challengeId, "incorrect")}
                  >
                    Fallada
                  </Button>
                </div>
              ) : null}
            </div>
          </div>

          <CurrentChallengeVideoContainer
            challenge={challenge}
            isRevealed={isRevealed}
          />
        </div>
      </article>
    </Panel>
  );
}

type CurrentChallengeTagsProps = {
  isRevealed?: boolean;
  isListened?: boolean;
  challenge: Challenge;
};

function CurrentChallengeTags(props: CurrentChallengeTagsProps) {
  const { isListened, isRevealed, challenge } = props;
  return (
    <div className="flex flex-wrap items-center gap-8">
      <Tag tone="inverse">Prueba activa</Tag>

      {isRevealed ? (
        <Tag tone="success">Resuelta</Tag>
      ) : isListened ? (
        <Tag tone="active">Escuchada</Tag>
      ) : (
        <Tag tone="subtle">Pendiente</Tag>
      )}

      <Tag tone={getDifficultyTagTone(challenge.difficulty)}>
        {challenge.difficulty[0].toUpperCase() + challenge.difficulty.slice(1)}{" "}
        · {challenge.points} puntos
      </Tag>
    </div>
  );
}

type CurrentChallengeAudioProps = {
  isListened: boolean;
  challenge: Challenge;
};

function CurrentChallengeAudio(props: CurrentChallengeAudioProps) {
  const { isListened, challenge } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const challengeId = challenge.id;
  const { markChallengeAsListened } = useGame();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
  }, [challengeId]);

  async function handleToggleAudio() {
    const audio = audioRef?.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
      markChallengeAsListened(challengeId, true);
    } catch {
      setIsPlaying(false);
    }
  }
  return (
    <div className="rounded-24 border border-border-soft bg-background/60 p-24">
      <div className="flex flex-col gap-16">
        <div className="flex flex-wrap items-start justify-between gap-16">
          <div>
            <p className="text-compact-02 text-text-muted">
              Fragmento de audio
            </p>

            <p className="mt-4 text-body-02 text-text-secondary">
              Duración: {formatTime(duration)}
            </p>
          </div>

          <Button
            type="button"
            kind="inverse"
            size="icon"
            aria-label={isPlaying ? "Pausar audio" : "Reproducir audio"}
            onClick={handleToggleAudio}
          >
            {isPlaying ? (
              <Pause className="size-16" />
            ) : (
              <Play className="size-16" />
            )}
          </Button>
        </div>

        <audio
          key={challengeId}
          ref={audioRef}
          src={challenge.audioSrc}
          preload="metadata"
          className="sr-only"
          onLoadedMetadata={(event) => {
            setDuration(event.currentTarget.duration || 0);
          }}
          onTimeUpdate={(event) => {
            setCurrentTime(event.currentTarget.currentTime || 0);
          }}
          onEnded={() => {
            setIsPlaying(false);
          }}
          onPause={() => {
            setIsPlaying(false);
          }}
          onPlay={() => {
            setIsPlaying(true);
          }}
        />

        <Progress value={duration > 0 ? (currentTime / duration) * 100 : 0} />

        <div className="mt-8 inline-flex items-center gap-12">
          <Checkbox
            id="challenge-listened"
            checked={isListened}
            onCheckedChange={(checked) =>
              markChallengeAsListened(challengeId, Boolean(checked))
            }
          />
          <label
            htmlFor="challenge-listened"
            className="text-compact-01 text-text-primary"
          >
            Marcar como escuchada
          </label>
        </div>
      </div>
    </div>
  );
}

type CurrentChallengeVideoContainerProps = {
  isRevealed: boolean;
  challenge: Challenge;
};

function CurrentChallengeVideoContainer(
  props: CurrentChallengeVideoContainerProps,
) {
  const { isRevealed, challenge } = props;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  async function handleFullscreen() {
    if (!isRevealed || !videoRef.current) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await videoRef.current.requestFullscreen();
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-16">
        <div>
          <h3 className="text-heading-03">Respuesta</h3>
          <p className="mt-8 text-body-02 text-text-secondary">
            {isRevealed
              ? "Ya puedes ver el vídeo asociado a esta prueba."
              : "Aquí aparecerá el vídeo asociado cuando reveles la escena."}
          </p>
        </div>

        <Button
          type="button"
          kind="inverse"
          size="icon"
          aria-label="Ver vídeo en pantalla completa"
          onClick={handleFullscreen}
          disabled={!isRevealed}
        >
          <Expand className="size-16" />
        </Button>
      </div>

      <div className="mt-24 overflow-hidden rounded-24 bg-layer">
        {isRevealed ? (
          <video
            key={challenge.id}
            ref={videoRef}
            src={challenge.videoSrc}
            controls
            playsInline
            className="aspect-video w-full"
          />
        ) : (
          <div className="flex aspect-video items-center justify-center px-24 text-center">
            <p className="text-body-02 text-text-inverse">
              Zona reservada para el vídeo de la escena.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
