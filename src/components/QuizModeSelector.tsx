import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Languages, Book, Globe, Hash } from "lucide-react";
import type { QuizMode } from "@/types/quiz";
import { Tooltip } from "@radix-ui/react-tooltip";

interface QuizModeSelectorProps {
  selectedMode: QuizMode;
  onModeChange: (mode: QuizMode) => void;
  selectedQuestionLimit: number;
  onQuestionLimitChange: (limit: number) => void;
}

export const QuizModeSelector = ({
  selectedMode,
  onModeChange,
  selectedQuestionLimit,
  onQuestionLimitChange,
}: QuizModeSelectorProps) => {
  const modes = [
    {
      id: "kanji-to-english" as const,
      label: "Kanji → English",
      description: "Read Japanese characters and select English meaning",
      icon: Languages,
      example: "漢字",
    },
    {
      id: "romanji-to-english" as const,
      label: "Romanji → English",
      description: "Read romanized Japanese and select English meaning",
      icon: Book,
      example: "kanji",
    },
    {
      id: "english-to-kanji" as const,
      label: "English → Kanji",
      description: "Read English word and select correct Japanese characters",
      icon: Globe,
      example: "characters",
    },
  ];

  const questionLimits = [10, 20, 30, 50, 100];

  return (
    <div className="space-y-4">
      {/* Study Mode */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Study mode
        </label>
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

      {/* Question Limit */}
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
    </div>
  );
};
