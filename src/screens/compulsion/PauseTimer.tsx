import { useEffect, useState } from "react";

interface PauseTimerProps {
  minutes: 2 | 5 | 10;
  onDone?: () => void;
}

export const PauseTimer = ({ minutes, onDone }: PauseTimerProps) => {
  const total = minutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(total);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setRunning(false);
          setDone(true);
          onDone?.();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, onDone]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const progress = ((total - secondsLeft) / total) * 100;

  return (
    <div className="card-elevated text-center">
      <p className="text-xs text-muted-foreground uppercase tracking-wider">Pausa de {minutes} min</p>
      <p className="text-5xl font-heading font-bold text-foreground mt-2 tabular-nums">
        {mm}:{ss}
      </p>
      <div className="w-full h-2 bg-muted rounded-full mt-4 overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>
      {done ? (
        <p className="text-sm text-primary font-medium mt-4">Você conseguiu! ✨</p>
      ) : (
        <div className="flex gap-2 mt-4 justify-center">
          {!running ? (
            <button
              onClick={() => setRunning(true)}
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold"
            >
              Iniciar pausa
            </button>
          ) : (
            <button
              onClick={() => setRunning(false)}
              className="px-5 py-2.5 rounded-xl bg-muted text-foreground text-sm font-bold"
            >
              Pausar
            </button>
          )}
          <button
            onClick={() => {
              setRunning(false);
              setSecondsLeft(total);
              setDone(false);
            }}
            className="px-4 py-2.5 rounded-xl bg-muted text-foreground text-sm"
          >
            Reiniciar
          </button>
        </div>
      )}
    </div>
  );
};
