interface StatSelectorProps {
  visibleStats: string[];
  onToggleStat: (stat: string) => void;
}

const STAT_LABELS = {
  questionCounter: "Question Counter",
  score: "Score",
  accuracy: "Accuracy",
  streak: "Streak",
};

export const StatSelector = ({
  visibleStats,
  onToggleStat,
}: StatSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Select stats to display
      </label>
      <div className="grid grid-cols-2 gap-2">
        {Object.keys(STAT_LABELS).map((stat) => {
          const isSelected = visibleStats.includes(stat);

          return (
            <button
              key={stat}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                isSelected
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-white border-border hover:border-primary/30 hover:bg-primary/5"
              }`}
              onClick={() => onToggleStat(stat)}
            >
              <span
                className={`text-xs font-medium text-center leading-tight ${
                  isSelected ? "text-primary" : "text-foreground"
                }`}
              >
                {STAT_LABELS[stat]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
