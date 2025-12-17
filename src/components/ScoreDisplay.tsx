import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Target, Zap, HelpCircle } from "lucide-react";

interface ScoreDisplayProps {
  score: number;
  total: number;
  current: number;
  streak: number;
}

export const ScoreDisplay = ({
  score,
  total,
  current,
  streak,
}: ScoreDisplayProps) => {
  console.log();
  const percentage =
    total > 0 && current > 1 ? Math.round((score / (current - 1)) * 100) : 0;

  const getScoreColor = () => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-primary";
  };

  const getProgressColor = () => {
    if (percentage >= 80) return "bg-success";
    if (percentage >= 60) return "bg-warning";
    return "bg-primary";
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Question Counter */}
        <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">
              Question
            </span>
            <HelpCircle className="h-4 w-4 text-primary/60" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {current}/{total}
          </div>
        </div>

        {/* Score */}
        <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">
              Score
            </span>
            <Trophy className="h-4 w-4 text-primary/60" />
          </div>
          <div className="text-2xl font-bold">
            <span className={getScoreColor()}>{score}</span>
            <span className="text-foreground">/{total}</span>
          </div>
        </div>

        {/* Accuracy */}
        <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">
              Accuracy
            </span>
            <Target className="h-4 w-4 text-primary/60" />
          </div>
          <div className={`text-2xl font-bold ${getScoreColor()}`}>
            {percentage}%
          </div>
        </div>

        {/* Streak */}
        <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">
              Streak
            </span>
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-primary">{streak}</div>
        </div>
      </div>
    </div>
  );
};
