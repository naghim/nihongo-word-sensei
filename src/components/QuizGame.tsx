import { ScoreDisplay } from "./ScoreDisplay";
import { QuizCard } from "./QuizCard";
import { QuizResults } from "./QuizResults";
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
  isQuizCompleted: boolean;
  isTimeUp: boolean;
  timeLimit: number;
  isTimerActive: boolean;
  onAnswer: (isCorrect: boolean) => void;
  onChangeMode: () => void;
  onReset: () => void;
  onTryAgain: () => void;
  onTimeUp: () => void;
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
  isQuizCompleted,
  isTimeUp,
  timeLimit,
  isTimerActive,
  onAnswer,
  onChangeMode,
  onTryAgain,
  onTimeUp,
  onToggleTimer,
  setTimeLimit,
}: QuizGameProps) => {
  const showQuizResults = isQuizCompleted || isTimeUp;
  const shouldShowPauseOverlay = !isTimerActive && timeLimit > 0;

  return (
    <div className="bg-gradient-subtle py-8 px-4 relative">
      {shouldShowPauseOverlay && <PauseOverlay onResume={onToggleTimer} />}

      {showQuizResults && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full animate-in fade-in zoom-in-95 duration-300">
            <QuizResults
              score={score}
              questionLimit={questionLimit}
              onTryAgain={onTryAgain}
              onChangeMode={onChangeMode}
              isTimeUp={isTimeUp}
            />
          </div>
        </div>
      )}

      <div
        className={`max-w-6xl mx-auto space-y-8 relative ${
          shouldShowPauseOverlay ? "opacity-90 blur-sm pointer-events-none" : ""
        }`}
      >
        {showQuizResults && (
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-2xl z-40" />
        )}

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
          onTimeUp={onTimeUp}
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
