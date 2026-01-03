import { QuizMode } from "@/types/quiz";

interface StudyModeProps {
  onModeChange: (mode: QuizMode) => void;
  modes: any;
  selectedMode: QuizMode;
}

export const StudyMode = ({
  onModeChange,
  modes,
  selectedMode,
}: StudyModeProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Study mode</label>
      <div className="grid grid-cols-3 gap-2">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = selectedMode === mode.id;

          return (
            <button
              key={mode.id}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                isSelected
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-white border-border hover:border-primary/30 hover:bg-primary/5"
              }`}
              onClick={() => onModeChange(mode.id)}
            >
              <div
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                  isSelected
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-xs font-medium text-center leading-tight ${
                  isSelected ? "text-primary" : "text-foreground"
                }`}
              >
                {mode.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
