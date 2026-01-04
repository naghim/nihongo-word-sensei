import { Button } from "@/components/ui/button";
import { QuizModeSelector } from "./QuizModeSelector";
import { BookOpen, Clock, PenSquare, Play, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { QuizMode } from "@/types/quiz";

interface QuizWelcomeProps {
  vocabularyCount: number;
  quizMode: QuizMode;
  questionLimit: number;
  showModeSelector: boolean;
  visibleStats: string[];
  onModeChange: (mode: QuizMode) => void;
  onQuestionLimitChange: (limit: number) => void;
  onStartQuiz: () => void;
  onToggleStat: (stat: string) => void;
}

export const QuizWelcome = ({
  vocabularyCount,
  quizMode,
  questionLimit,
  showModeSelector,
  visibleStats,
  onModeChange,
  onQuestionLimitChange,
  onStartQuiz,
  onToggleStat,
}: QuizWelcomeProps) => {
  const featureHighlights: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
  }> = [
    {
      icon: Sparkles,
      title: "Curated word journeys",
      description:
        "Follow themed sets that build real-world vocabulary without feeling robotic.",
    },
    {
      icon: Clock,
      title: "Flexible sessions",
      description:
        "Pick just a few prompts or settle in for a longer review—whatever fits today.",
    },
    {
      icon: PenSquare,
      title: "Context with nuance",
      description:
        "See sample phrases and gentle reminders so meanings actually stick.",
    },
    {
      icon: BookOpen,
      title: "Steady progress",
      description:
        "Track how many words you have ready and revisit favorites anytime.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-white">
      <div className="max-w-7xl mx-auto px-6 pt-12 lg:pt-5 pb-5">
        {/* Content */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left Section - Hero */}
          <section className="space-y-10">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <img
                    src="/favicon.png"
                    alt="Nihongo Word Sensei Logo"
                    className="h-24 w-24"
                  />
                </div>

                <h1 className="space-y-3">
                  <span className="block text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Nihongo Word Sensei
                  </span>
                  <span className="block text-6xl font-light leading-tight text-foreground sm:text-7xl lg:text-8xl font-japanese">
                    日本語の旅へ
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                  Master Japanese vocabulary through curated word journeys and
                  flexible practice sessions.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="group rounded-2xl border border-border bg-white/80 p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-muted-foreground">
                      Words ready
                    </span>
                    <BookOpen className="h-5 w-5 text-primary/60 transition-colors group-hover:text-primary" />
                  </div>
                  <p className="text-4xl font-bold text-foreground mb-2">
                    {vocabularyCount}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Fresh entries waiting for you
                  </p>
                </div>

                <div className="group rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-muted-foreground">
                      Quick start
                    </span>
                    <Play className="h-5 w-5 text-primary/60 transition-colors group-hover:text-primary" />
                  </div>
                  <p className="text-sm text-foreground font-medium mb-2">
                    Pick a study mode →
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Start learning in seconds
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Right Section - Quiz Settings */}
          <aside className="lg:sticky lg:top-20 animate-in slide-in-from-bottom-8 fade-in duration-1000">
            <div className="rounded-3xl border border-border bg-white p-8 shadow-xl space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Configure session
                </div>
                <h2 className="text-3xl font-bold text-foreground">
                  Ready to begin?
                </h2>
                <p className="text-muted-foreground">
                  Choose your study mode and question limit below:
                </p>
              </div>

              {showModeSelector && (
                <QuizModeSelector
                  selectedMode={quizMode}
                  onModeChange={onModeChange}
                  selectedQuestionLimit={questionLimit}
                  onQuestionLimitChange={onQuestionLimitChange}
                  visibleStats={visibleStats}
                  onToggleStat={onToggleStat}
                />
              )}

              <Button
                size="lg"
                onClick={onStartQuiz}
                className="w-full justify-center rounded-xl px-8 py-6 text-base font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] bg-primary hover:bg-primary/90"
              >
                <Play className="mr-2 h-5 w-5" />
                Begin session
              </Button>

              <div className="pt-4 border-t border-border">
                <p className="text-center text-sm text-muted-foreground leading-relaxed">
                  Happy learning! Remember, consistency is key!
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
