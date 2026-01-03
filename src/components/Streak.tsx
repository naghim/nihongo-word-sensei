import { Zap } from "lucide-react";

interface StreakProps {
  streak: number;
}

export const Streak = ({ streak }: StreakProps) => {
  return (
    <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground">
          Streak
        </span>
        <Zap className="h-4 w-4 text-primary" />
      </div>
      <div className="text-2xl font-bold text-primary">{streak}</div>
    </div>
  );
};
