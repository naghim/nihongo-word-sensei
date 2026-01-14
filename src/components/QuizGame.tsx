import { ScoreDisplay } from "./ScoreDisplay";
import { QuizCard } from "./QuizCard";
import type { VocabularyItem, QuizMode } from "@/types/quiz";
import { PauseOverlay } from "./PauseOverlay";

interface QuizGameProps {
  currentQuestion: VocabularyItem | null;
  options: VocabularyItem[];
  quizMode: QuizMode;
  score: number;
  questionLimit: number;
  questionNumber: number;
  streak: number;
  visibleStats: string[];
  timeLimit: number;
  isTimerActive: boolean;
  onAnswer: (isCorrect: boolean) => void;
  onChangeMode: () => void;
  onReset: () => void;
  onToggleTimer: () => void;
  setTimeLimit: (limit: number) => void;
}

export const QuizGame = ({
  currentQuestion,
  options,
  quizMode,
  score,
  questionLimit,
  questionNumber,
  streak,
  visibleStats,
  timeLimit,
  isTimerActive,
  onAnswer,
  onChangeMode,
  onReset,
  onToggleTimer,
  setTimeLimit,
}: QuizGameProps) => {
  const shouldShowPauseOverlay = !isTimerActive && timeLimit > 0;

  return (
    <div className="bg-gradient-subtle py-8 px-4">
      {shouldShowPauseOverlay && <PauseOverlay onResume={onToggleTimer} />}

      <div
        className={`max-w-6xl mx-auto space-y-8 ${
          shouldShowPauseOverlay ? "opacity-90 blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Score Display */}
        <ScoreDisplay
          score={score}
          total={questionLimit}
          current={
            questionNumber !== questionLimit
              ? questionNumber + 1
              : questionNumber
          }
          streak={streak}
          visibleStats={visibleStats}
          timeLimit={timeLimit}
          setTimeLimit={setTimeLimit}
          isTimerActive={isTimerActive}
          onToggleTimer={onToggleTimer}
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
