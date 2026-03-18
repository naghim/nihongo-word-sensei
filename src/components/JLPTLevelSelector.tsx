import type { JLPTLevel } from "@/types/quiz";

interface JLPTLevelSelectorProps {
  selectedLevel: JLPTLevel;
  onLevelChange: (level: JLPTLevel) => void;
  vocabularyCountByLevel: Record<string, number>;
}

export const JLPTLevelSelector = ({
  selectedLevel,
  onLevelChange,
  vocabularyCountByLevel,
}: JLPTLevelSelectorProps) => {
  const levels: JLPTLevel[] = ["all", "N5", "N4", "N3", "N2", "N1"];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        JLPT level
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {levels.map((level) => {
          const isSelected = selectedLevel === level;
          const wordCount =
            level === "all"
              ? vocabularyCountByLevel.All
              : vocabularyCountByLevel[level] || 0;

          return (
            <button
              key={level}
              type="button"
              onClick={() => onLevelChange(level)}
              className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                isSelected
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-white border-border hover:border-primary/30 hover:bg-primary/5"
              }`}
            >
              <span
                className={`text-sm font-bold ${
                  isSelected ? "text-primary" : "text-foreground"
                }`}
              >
                {level === "all" ? "All" : level}
              </span>
              <span
                className={`text-xs ${
                  isSelected ? "text-primary/70" : "text-muted-foreground"
                }`}
              >
                {wordCount} words
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
