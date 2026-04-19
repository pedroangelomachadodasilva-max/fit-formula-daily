import { useEffect, useRef, useState } from "react";

interface BreathingCircleProps {
  inhale?: number;
  hold?: number;
  exhale?: number;
  cycles?: number;
  onComplete?: () => void;
}

type Phase = "inhale" | "hold" | "exhale" | "rest";

export const BreathingCircle = ({
  inhale = 4,
  hold = 4,
  exhale = 6,
  cycles = 5,
  onComplete,
}: BreathingCircleProps) => {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>("rest");
  const [secondsLeft, setSecondsLeft] = useState(inhale);
  const [cycleCount, setCycleCount] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(t);
  }, [running]);

  useEffect(() => {
    if (!running || secondsLeft > 0) return;
    if (phase === "inhale") {
      setPhase("hold");
      setSecondsLeft(hold);
    } else if (phase === "hold") {
      setPhase("exhale");
      setSecondsLeft(exhale);
    } else if (phase === "exhale") {
      const next = cycleCount + 1;
      setCycleCount(next);
      if (next >= cycles) {
        setRunning(false);
        setPhase("rest");
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete?.();
        }
      } else {
        setPhase("inhale");
        setSecondsLeft(inhale);
      }
    }
  }, [secondsLeft, running, phase, cycleCount, cycles, inhale, hold, exhale, onComplete]);

  const start = () => {
    completedRef.current = false;
    setCycleCount(0);
    setPhase("inhale");
    setSecondsLeft(inhale);
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
    setPhase("rest");
  };

  const phaseLabel: Record<Phase, string> = {
    inhale: "Inspire",
    hold: "Segure",
    exhale: "Expire",
    rest: "Pronta?",
  };

  const scale = phase === "inhale" ? 1 : phase === "hold" ? 1 : phase === "exhale" ? 0.55 : 0.7;
  const duration = phase === "inhale" ? inhale : phase === "exhale" ? exhale : 0.4;

  return (
    <div className="flex flex-col items-center py-6">
      <div className="relative w-64 h-64 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/15 to-mint blur-2xl" />
        <div
          className="relative rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-primary-foreground shadow-2xl"
          style={{
            width: "16rem",
            height: "16rem",
            transform: `scale(${scale})`,
            transition: `transform ${duration}s ease-in-out`,
          }}
        >
          <div className="text-center">
            <p className="text-sm uppercase tracking-wider opacity-90">{phaseLabel[phase]}</p>
            {running && <p className="text-5xl font-heading font-bold mt-1">{secondsLeft}</p>}
            {!running && <p className="text-2xl font-heading font-bold mt-1">{cycleCount > 0 ? "✓" : "❤"}</p>}
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-4">
        Ciclo {Math.min(cycleCount + (running ? 1 : 0), cycles)} de {cycles}
      </p>
      <div className="flex gap-3 mt-4">
        {!running ? (
          <button
            onClick={start}
            className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-md"
          >
            {cycleCount >= cycles && cycleCount > 0 ? "Repetir" : "Começar"}
          </button>
        ) : (
          <button
            onClick={stop}
            className="px-6 py-3 rounded-2xl bg-muted text-foreground font-bold text-sm"
          >
            Pausar
          </button>
        )}
      </div>
    </div>
  );
};
