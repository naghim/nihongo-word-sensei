import { useEffect, useState, useRef } from "react";
import { Timer, Pause, Play } from "lucide-react";

interface TimerProps {
  timeLimit: number;
  setTimeLimit: React.Dispatch<React.SetStateAction<number>>;
  isActive: boolean;
  onToggle: () => void;
}

export const QuizTimer = ({
  timeLimit,
  setTimeLimit,
  isActive,
  onToggle,
}: TimerProps) => {
  const [initialTime] = useState(timeLimit);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const onTimeUp = () => {
    console.log("Time's up!");
  };

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getTimerColor = () => {
    if (timeLimit === 0) return "text-muted-foreground";

    const percent = (timeLimit / initialTime) * 100;

    if (percent > 50) return "text-success";
    if (percent > 25) return "text-warning";
    return "text-destructive animate-pulse";
  };

  const getTimerProgressBarColor = () => {
    if (timeLimit === 0) return "bg-muted";

    const percent = (timeLimit / initialTime) * 100;

    if (percent > 50) return "bg-success/70";
    if (percent > 25) return "bg-warning/70";
    return "bg-destructive/70";
  };

  useEffect(() => {
    if (timeLimit <= 0 || !isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLimit((prev: number) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timeLimit, isActive, setTimeLimit]);

  if (timeLimit === 0) {
    return null;
  }

  return (
    <div className={`rounded-xl border border-border p-4 shadow-sm`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground">Timer</span>
        <div className="flex items-center gap-1">
          <Timer className={`h-4 w-4 ${getTimerColor()}`} />
          <button
            onClick={onToggle}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            {isActive ? (
              <>
                <Pause className="h-3 w-3" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-3 w-3" />
                Resume
              </>
            )}
          </button>
        </div>
      </div>
      <div className={`text-2xl font-bold ${getTimerColor()} font-mono`}>
        {formatTime(timeLimit)}
      </div>

      <div className="mt-2">
        <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${getTimerProgressBarColor()}`}
            style={{
              width: `${Math.max(0, (timeLimit / initialTime) * 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
