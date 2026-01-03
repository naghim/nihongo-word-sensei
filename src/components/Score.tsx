import { Trophy } from "lucide-react";

interface ScoreProps {
  getScoreColor: () => string;
  score: number;
  total: number;
}

export const Score = ({ getScoreColor, score, total }: ScoreProps) => {
  return (
    <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground">Score</span>
        <Trophy className="h-4 w-4 text-primary/60" />
      </div>
      <div className="text-2xl font-bold">
        <span className={getScoreColor()}>{score}</span>
        <span className="text-foreground">/{total}</span>
      </div>
    </div>
  );
};
