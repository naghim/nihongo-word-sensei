import { HelpCircle } from "lucide-react";

interface QuestionCounterProps {
  current: number;
  total: number;
}

export const QuestionCounter = ({ current, total }: QuestionCounterProps) => {
  return (
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
  );
};
