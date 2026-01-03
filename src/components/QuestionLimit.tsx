import { Button } from "./ui/button";

interface QuestionLimitProps {
  questionLimits: any;
  selectedQuestionLimit: number;
  onQuestionLimitChange: (limit: number) => void;
}

export const QuestionLimit = ({
  questionLimits,
  selectedQuestionLimit,
  onQuestionLimitChange,
}: QuestionLimitProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Number of questions
      </label>
      <div className="flex gap-2 flex-wrap">
        {questionLimits.map((limit) => (
          <Button
            key={limit}
            variant={selectedQuestionLimit === limit ? "default" : "outline"}
            size="sm"
            onClick={() => onQuestionLimitChange(limit)}
            className={`flex-1 min-w-[60px] transition-all ${
              selectedQuestionLimit === limit
                ? "bg-primary hover:bg-primary/90"
                : "border-border hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            }`}
          >
            {limit}
          </Button>
        ))}
      </div>
    </div>
  );
};
