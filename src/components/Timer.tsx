import { useEffect, useState, useRef } from "react";
import { Timer, Pause, Play } from "lucide-react";

interface TimerProps {
  timeLimit: number;
  setTimeLimit: React.Dispatch<React.SetStateAction<number>>;
  onTimeUp: () => void;
  isActive?: boolean;
  onToggle?: () => void;
}

export const QuizTimer = ({
  timeLimit,
  setTimeLimit,
  onTimeUp,
  isActive: externalIsActive,
  onToggle: externalOnToggle,
}: TimerProps) => {
  const [internalIsActive, setInternalIsActive] = useState(timeLimit > 0);
  const [initialTime, setInitialTime] = useState(timeLimit);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const isControlled =
    externalIsActive !== undefined && externalOnToggle !== undefined;
  const isActive = isControlled ? externalIsActive : internalIsActive;

  useEffect(() => {
    if (timeLimit > 0 && initialTime === 0) {
      setInitialTime(timeLimit);
    }
  }, [timeLimit, initialTime]);

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getTimerColor = () => {
    if (timeLimit === 0) return "text-muted-foreground";

    const baseTime = initialTime > 0 ? initialTime : timeLimit;
    const percent = (timeLimit / baseTime) * 100;

    if (percent > 50) return "text-success";
    if (percent > 25) return "text-warning";
    return "text-destructive animate-pulse";
  };

  const getTimerProgressBarColor = () => {
    if (timeLimit === 0) return "bg-muted";

    const baseTime = initialTime > 0 ? initialTime : timeLimit;
    const percent = (timeLimit / baseTime) * 100;

    if (percent > 50) return "bg-success/70";
    if (percent > 25) return "bg-warning/70";
    return "bg-destructive/70";
  };

  const toggleTimer = () => {
    if (timeLimit <= 0) return;

    if (isControlled) {
      externalOnToggle();
    } else {
      setInternalIsActive((prev) => !prev);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isActive || timeLimit <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLimit((prev: number) => {
        if (prev <= 1) {
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
  }, [isActive, timeLimit, setTimeLimit, onTimeUp]);

  if (timeLimit === 0) {
    return (
      <div className="rounded-xl border border-border p-4 shadow-sm bg-muted/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">
            Timer
          </span>
          <Timer className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold text-muted-foreground font-mono">
          ∞
        </div>
        <div className="mt-2">
          <div className="h-1 w-full bg-muted rounded-full" />
        </div>
      </div>
    );
  }

  const progressWidth =
    initialTime > 0 ? Math.max(0, (timeLimit / initialTime) * 100) : 100;

  return (
    <div className="rounded-xl border border-border p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground">Timer</span>
        <div className="flex items-center gap-1">
          <Timer className={`h-4 w-4 ${getTimerColor()}`} />
          <button
            onClick={toggleTimer}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            disabled={timeLimit === 0}
          >
            {isActive ? (
              <>
                <Pause className="h-3 w-3" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-3 w-3" />
                {timeLimit === 0 ? "Finished" : "Resume"}
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
              width: `${progressWidth}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
