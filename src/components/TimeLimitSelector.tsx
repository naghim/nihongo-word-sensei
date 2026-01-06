import { Clock } from "lucide-react";

interface TimeLimitSelectorProps {
  timeLimit: number;
  onTimeLimitChange: (limit: number) => void;
}

export const TimeLimitSelector = ({
  timeLimit,
  onTimeLimitChange,
}: TimeLimitSelectorProps) => {
  const timeOptions = [
    { value: 30, label: "30 seconds" },
    { value: 60, label: "1 minute" },
    { value: 120, label: "2 minutes" },
    { value: 180, label: "3 minutes" },
    { value: 300, label: "5 minutes" },
    { value: 600, label: "10 minutes" },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-foreground">
          Time Limit
        </label>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {timeOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onTimeLimitChange(option.value)}
            className={`flex items-center justify-center p-2 rounded-lg border-2 transition-all ${
              timeLimit === option.value
                ? "bg-primary/10 border-primary text-primary"
                : "bg-white border-border hover:border-primary/30 hover:bg-primary/5"
            }`}
          >
            <span className="text-sm font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
