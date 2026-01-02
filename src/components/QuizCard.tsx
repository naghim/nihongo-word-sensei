import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import type { VocabularyItem, QuizMode } from "@/types/quiz";

interface QuizCardProps {
  question: VocabularyItem;
  options: VocabularyItem[];
  quizMode: QuizMode;
  onAnswer: (isCorrect: boolean) => void;
}

export const QuizCard = ({
  question,
  options,
  quizMode,
  onAnswer,
}: QuizCardProps) => {
  const OPTION_LETTERS = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
  };

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const getQuestionText = () => {
    switch (quizMode) {
      case "kanji-to-english":
        return question.kanji;
      case "romanji-to-english":
        return question.romanji;
      case "english-to-kanji":
        return question.english;
      default:
        return question.kanji;
    }
  };

  const getOptionText = (option: VocabularyItem) => {
    switch (quizMode) {
      case "kanji-to-english":
        return option.english;
      case "romanji-to-english":
        return option.english;
      case "english-to-kanji":
        return option.kanji;
      default:
        return option.english;
    }
  };

  const getQuestionSubtext = () => {
    switch (quizMode) {
      case "kanji-to-english":
        return `${question.hiragana} • ${question.romanji}`;
      case "romanji-to-english":
        return question.hiragana !== question.kanji
          ? `${question.hiragana} • ${question.kanji}`
          : question.hiragana;
      case "english-to-kanji":
        return;
      default:
        return question.hiragana;
    }
  };

  const getOptionSubtext = (option: VocabularyItem) => {
    switch (quizMode) {
      case "kanji-to-english":
        return null;
      case "romanji-to-english":
        return null;
      case "english-to-kanji":
        return `${option.hiragana} • ${option.romanji}`;
      default:
        return null;
    }
  };

  const handleAnswerSelect = (optionId: number) => {
    if (showResult) return;

    setSelectedAnswer(optionId);
    setShowResult(true);

    const isCorrect = optionId === question.id;

    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedAnswer(null);
      setShowResult(false);
    }, 1800);
  };

  const getCardClasses = (optionId: number) => {
    const baseClasses =
      "relative cursor-pointer transition-all duration-300 group hover:scale-[1.01] active:scale-[0.99]";

    if (!showResult) {
      return `${baseClasses} bg-white border-2 border-border hover:border-primary/30 hover:shadow-md`;
    }

    if (optionId === question.id) {
      return `${baseClasses} bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-success shadow-lg`;
    }

    if (optionId === selectedAnswer && optionId !== question.id) {
      return `${baseClasses} bg-gradient-to-br from-red-50 to-rose-50 border-2 border-primary shadow-lg`;
    }

    return `${baseClasses} bg-muted/50 border-2 border-border opacity-50`;
  };

  const getResultIcon = (optionId: number) => {
    if (!showResult) return null;
    if (optionId === question.id)
      return (
        <CheckCircle className="absolute top-3 right-3 w-6 h-6 text-success drop-shadow-sm" />
      );
    if (optionId === selectedAnswer && optionId !== question.id)
      return (
        <XCircle className="absolute top-3 right-3 w-6 h-6 text-primary drop-shadow-sm" />
      );
    return null;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Question Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary">
          <span className="font-medium">
            {quizMode === "kanji-to-english" && "Kanji → English"}
            {quizMode === "romanji-to-english" && "Romanji → English"}
            {quizMode === "english-to-kanji" && "English → Kanji"}
          </span>
        </div>

        <div className="text-6xl lg:text-7xl font-japanese font-light text-foreground leading-none">
          {getQuestionText()}
        </div>

        {getQuestionSubtext() && (
          <div className="text-lg text-muted-foreground font-japanese">
            {getQuestionSubtext()}
          </div>
        )}
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option, index) => (
          <Card
            key={option.id}
            className={getCardClasses(option.id)}
            onClick={() => handleAnswerSelect(option.id)}
          >
            {getResultIcon(option.id)}
            <CardContent className="p-6 text-center space-y-2">
              <div className="text-2xl font-japanese font-medium text-foreground group-hover:text-primary transition-colors">
                {getOptionText(option)}
              </div>
              {getOptionSubtext(option) && (
                <div className="text-sm text-muted-foreground font-japanese">
                  {getOptionSubtext(option)}
                </div>
              )}

              {/* Option Label */}
              <div className="absolute -top-1 left-1">
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {OPTION_LETTERS[index]}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
