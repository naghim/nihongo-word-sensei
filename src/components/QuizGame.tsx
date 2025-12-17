import { QuizHeader } from "./QuizHeader";
import { ScoreDisplay } from "./ScoreDisplay";
import { QuizCard } from "./QuizCard";
import type { VocabularyItem, QuizMode } from "@/types/quiz";

interface QuizGameProps {
  currentQuestion: VocabularyItem | null;
  options: VocabularyItem[];
  quizMode: QuizMode;
  score: number;
  questionLimit: number;
  questionNumber: number;
  streak: number;
  onAnswer: (isCorrect: boolean) => void;
  onChangeMode: () => void;
  onReset: () => void;
}

export const QuizGame = ({
  currentQuestion,
  options,
  quizMode,
  score,
  questionLimit,
  questionNumber,
  streak,
  onAnswer,
  onChangeMode,
  onReset,
}: QuizGameProps) => {
  return (
    <div className="min-h-screen bg-gradient-subtle py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <QuizHeader onChangeMode={onChangeMode} onReset={onReset} />

        {/* Score Display */}
        <ScoreDisplay
          score={score}
          total={questionLimit}
          current={questionNumber + 1}
          streak={streak}
        />

        {/* Quiz Card */}
        {currentQuestion && options.length > 0 && (
          <QuizCard
            question={currentQuestion}
            options={options}
            quizMode={quizMode}
            onAnswer={onAnswer}
          />
        )}
      </div>
    </div>
  );
};
