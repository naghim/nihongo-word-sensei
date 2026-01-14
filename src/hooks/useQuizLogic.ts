import { useState } from "react";
import { getRandomVocabulary } from "@/data/vocabulary";
import { useToast } from "@/hooks/use-toast";
import type { QuizMode, VocabularyItem } from "@/types/quiz";

export const useQuizLogic = () => {
  const [currentQuestion, setCurrentQuestion] = useState<VocabularyItem | null>(
    null
  );
  const [options, setOptions] = useState<VocabularyItem[]>([]);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [streak, setStreak] = useState(0);
  const [questionLimit, setQuestionLimit] = useState(10);
  const [quizMode, setQuizMode] = useState<QuizMode>("kanji-to-english");
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [showModeSelector, setShowModeSelector] = useState(true);
  const [timeLimit, setTimeLimit] = useState(60);
  const { toast } = useToast();
  const [isTimerActive, setIsTimerActive] = useState(true);

  const [visibleStats, setVisibleStats] = useState<string[]>([
    "questionCounter",
    "score",
    "accuracy",
    "streak",
    "timer",
  ]);

  const resetScroll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  };

  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [selectedTimeLimit, setSelectedTimeLimit] = useState(60);

  const generateNewQuestion = () => {
    const randomItems = getRandomVocabulary(4);
    const questionItem =
      randomItems[Math.floor(Math.random() * randomItems.length)];

    setCurrentQuestion(questionItem);
    setOptions(randomItems.sort(() => 0.5 - Math.random()));
  };

  const handleAnswer = (isCorrect: boolean) => {
    const newQuestionNumber = questionNumber + 1;
    setQuestionNumber(newQuestionNumber);

    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      toast({
        title: "正解! Perfect!",
        description: `Great job! You're on a ${streak + 1} streak!`,
      });
    } else {
      setStreak(0);
      toast({
        title: "Almost there!",
        description: "Keep practicing, you're improving!",
        variant: "destructive",
      });
    }

    // Check if quiz is complete
    if (newQuestionNumber >= questionLimit) {
      setIsQuizCompleted(true);
    } else {
      setTimeout(generateNewQuestion, 300);
    }
  };

  const startQuiz = () => {
    setIsQuizStarted(true);
    setIsQuizCompleted(false);
    setIsTimerActive(true);
    setShowModeSelector(false);
    setTimeLimit(selectedTimeLimit);
    generateNewQuestion();
    resetScroll();
  };

  const resetQuiz = () => {
    resetStats();
    setIsQuizCompleted(false);
    setIsQuizStarted(true);
    setTimeLimit(selectedTimeLimit);
    generateNewQuestion();
  };

  const changeModeAndRestart = () => {
    setShowModeSelector(true);
    setIsQuizStarted(false);
    setIsQuizCompleted(false);
    resetStats();
    setCurrentQuestion(null);
    setOptions([]);
  };

  const resetStats = () => {
    setScore(0);
    setQuestionNumber(0);
    setStreak(0);
    setIsTimerActive(true);
  };

  const handleTryAgain = () => {
    resetQuiz();
  };

  const toggleStatVisibility = (stat: string) => {
    setVisibleStats((prev) =>
      prev.includes(stat) ? prev.filter((s) => s !== stat) : [...prev, stat]
    );
  };

  const handleToggleTimer = () => {
    setIsTimerActive(!isTimerActive);
  };

  return {
    // State
    currentQuestion,
    options,
    score,
    questionNumber,
    streak,
    questionLimit,
    quizMode,
    isQuizStarted,
    showModeSelector,
    isQuizCompleted,
    visibleStats,
    timeLimit,
    selectedTimeLimit,
    isTimerActive,

    // Actions
    setQuizMode,
    setQuestionLimit,
    handleAnswer,
    startQuiz,
    resetQuiz,
    changeModeAndRestart,
    handleTryAgain,
    toggleStatVisibility,
    setTimeLimit,
    setSelectedTimeLimit,
    handleToggleTimer,
  };
};
