import { Target } from "lucide-react";

interface AccuracyProps {
  percentage: number;
  getScoreColor: () => string;
}

export const Accuracy = ({ percentage, getScoreColor }: AccuracyProps) => {
  return (
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
  );
};
