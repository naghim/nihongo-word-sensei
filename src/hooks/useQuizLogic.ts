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
  const { toast } = useToast();

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
      setTimeout(() => {
        setIsQuizStarted(false);
        setShowModeSelector(false);
      }, 300);
    } else {
      setTimeout(generateNewQuestion, 300);
    }
  };

  const startQuiz = () => {
    setIsQuizStarted(true);
    setShowModeSelector(false);
    generateNewQuestion();
  };

  const resetQuiz = () => {
    setScore(0);
    setQuestionNumber(0);
    setStreak(0);
    setIsQuizStarted(true);
    generateNewQuestion();
  };

  const changeModeAndRestart = () => {
    setShowModeSelector(true);
    setIsQuizStarted(false);
    setScore(0);
    setQuestionNumber(0);
    setStreak(0);
    setCurrentQuestion(null);
    setOptions([]);
  };

  const handleTryAgain = () => {
    resetQuiz();
  };

  const handleChangeModeFromResults = () => {
    resetQuiz();
    setShowModeSelector(true);
  };

  // Check if quiz is completed
  const isQuizCompleted = questionNumber >= questionLimit && !isQuizStarted;

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

    // Actions
    setQuizMode,
    setQuestionLimit,
    handleAnswer,
    startQuiz,
    resetQuiz,
    changeModeAndRestart,
    handleTryAgain,
    handleChangeModeFromResults,
  };
};
