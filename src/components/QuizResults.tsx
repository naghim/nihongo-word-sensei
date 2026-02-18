import { Button } from "@/components/ui/button";
import { RotateCcw, Settings, Timer } from "lucide-react";

interface QuizResultsProps {
  score: number;
  questionLimit: number;
  isTimeUp: boolean;
  onTryAgain: () => void;
  onChangeMode: () => void;
}

export const QuizResults = ({
  score,
  questionLimit,
  isTimeUp,
  onTryAgain,
  onChangeMode,
}: QuizResultsProps) => {
  const percentage = Math.round((score / questionLimit) * 100);

  const getResultMessage = () => {
    if (isTimeUp) {
      if (percentage >= 80) return "Great time management! ⏱️";
      if (percentage >= 60) return "Good pace, keep going! 🏃‍♂️";
      return "Time's up! Practice more to get faster! 🐌";
    }

    if (percentage >= 80) return "Excellent work! 🎉";
    if (percentage >= 60) return "Good job! Keep practicing! 👍";
    return "Keep practicing, you're improving! 💪";
  };

  const getTitle = () => {
    return isTimeUp ? "時間切れ!" : "完了!";
  };

  const getSubtitle = () => {
    return isTimeUp ? "Time's up!" : "Quiz complete!";
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-red-50/20 to-white flex items-center justify-center py-8 px-4">
      <div className="max-w-2xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Hero Header */}
        <div className="text-center space-y-3">
          <h1 className="text-7xl font-japanese font-light text-foreground leading-none">
            {getTitle()}
          </h1>
          <p className="text-xl text-muted-foreground flex items-center justify-center gap-2">
            {isTimeUp && <Timer className="h-5 w-5" />}
            {getSubtitle()}
          </p>
        </div>

        {/* Results Card */}
        <div className="rounded-2xl border border-border bg-white p-8 shadow-xl">
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <div
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                  isTimeUp
                    ? "bg-destructive/10 text-destructive"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {isTimeUp && <Timer className="h-3 w-3" />}
                {isTimeUp ? "Time's Up!" : "Results"}
              </div>

              <div className="text-5xl font-bold text-primary">
                {score}/{questionLimit}
              </div>

              <div className="text-xl text-muted-foreground">
                {percentage}% Accuracy
                {isTimeUp && " (under time pressure)"}
              </div>

              <div className="text-base text-foreground font-medium">
                {getResultMessage()}
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button
                size="lg"
                onClick={onTryAgain}
                className={`w-full justify-center rounded-xl px-6 py-4 text-base font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] ${
                  isTimeUp
                    ? "bg-destructive hover:bg-destructive/90"
                    : "bg-primary hover:bg-primary/90"
                }`}
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Try again
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={onChangeMode}
                className="w-full justify-center hover:text-primary rounded-xl px-6 py-4 text-base font-semibold border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                <Settings className="w-5 h-5 mr-2" />
                Choose different mode
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
