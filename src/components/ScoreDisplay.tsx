import { QuestionCounter } from "./QuestionCounter";
import { Score } from "./Score";
import { Accuracy } from "./Accuracy";
import { Streak } from "./Streak";
import { QuizTimer } from "./Timer";

interface ScoreDisplayProps {
  score: number;
  total: number;
  current: number;
  streak: number;
  visibleStats: string[];
  timeLimit: number;
  setTimeLimit: (limit: number) => void;
  isTimerActive: boolean;
  onToggleTimer: () => void;
}

export const ScoreDisplay = ({
  score,
  total,
  current,
  streak,
  visibleStats,
  timeLimit,
  setTimeLimit,
  isTimerActive,
  onToggleTimer,
}: ScoreDisplayProps) => {
  const percentage =
    total > 0 && current > 1 ? Math.round((score / (current - 1)) * 100) : 0;

  const getScoreColor = () => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-primary";
  };

  const STAT_COMPONENTS = {
    questionCounter: <QuestionCounter current={current} total={total} />,
    score: <Score getScoreColor={getScoreColor} score={score} total={total} />,
    accuracy: (
      <Accuracy percentage={percentage} getScoreColor={getScoreColor} />
    ),
    streak: <Streak streak={streak} />,
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {visibleStats.map((stat) => STAT_COMPONENTS[stat])}

        {timeLimit > 0 && (
          <QuizTimer
            timeLimit={timeLimit}
            setTimeLimit={setTimeLimit}
            isActive={isTimerActive}
            onToggle={onToggleTimer}
          />
        )}
      </div>
    </div>
  );
};
