import { Languages, Book, Globe, Hash, Clock } from "lucide-react";
import type { QuizMode } from "@/types/quiz";
import { StudyMode } from "./StudyMode";
import { QuestionLimit } from "./QuestionLimit";
import { StatSelector } from "./StatSelector";
import { TimeLimitSelector } from "./TimeLimitSelector";

interface QuizModeSelectorProps {
  selectedMode: QuizMode;
  onModeChange: (mode: QuizMode) => void;
  selectedQuestionLimit: number;
  onQuestionLimitChange: (limit: number) => void;
  visibleStats: string[];
  onToggleStat: (stat: string) => void;
  timeLimit: number;
  onTimeLimitChange: (limit: number) => void;
}

export const QuizModeSelector = ({
  selectedMode,
  onModeChange,
  selectedQuestionLimit,
  onQuestionLimitChange,
  visibleStats,
  onToggleStat,
  timeLimit,
  onTimeLimitChange,
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
      <StudyMode
        onModeChange={onModeChange}
        modes={modes}
        selectedMode={selectedMode}
      />

      {/* Question Limit */}
      <QuestionLimit
        questionLimits={questionLimits}
        selectedQuestionLimit={selectedQuestionLimit}
        onQuestionLimitChange={onQuestionLimitChange}
      />

      {/* Time Limit Selector */}
      <TimeLimitSelector
        timeLimit={timeLimit}
        onTimeLimitChange={onTimeLimitChange}
      />

      {/* Stat Selector */}
      <StatSelector visibleStats={visibleStats} onToggleStat={onToggleStat} />
    </div>
  );
};
