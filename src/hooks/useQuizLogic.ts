import { useEffect, useState, useCallback } from "react";
import { vocabularyData } from "@/data/vocabulary";
import { useToast } from "@/hooks/use-toast";
import type { QuizMode, VocabularyItem, JLPTLevel } from "@/types/quiz";

export const useQuizLogic = () => {
  const [currentQuestion, setCurrentQuestion] = useState<VocabularyItem | null>(
    null,
  );
  const [options, setOptions] = useState<VocabularyItem[]>([]);
  const [questions, setQuestions] = useState<VocabularyItem[]>([]);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [streak, setStreak] = useState(0);
  const [questionLimit, setQuestionLimit] = useState(10);
  const [quizMode, setQuizMode] = useState<QuizMode>("kanji-to-english");
  const [selectedJLPTLevel, setSelectedJLPTLevel] = useState<JLPTLevel>("all");
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [showModeSelector, setShowModeSelector] = useState(true);
  const [timeLimit, setTimeLimit] = useState(60);
  const { toast } = useToast();
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const [visibleStats, setVisibleStats] = useState<string[]>([
    "questionCounter",
    "score",
    "accuracy",
    "streak",
    "timer",
  ]);

  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [selectedTimeLimit, setSelectedTimeLimit] = useState(60);

  const resetScroll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  };

  const getFilteredVocabulary = useCallback(() => {
    if (selectedJLPTLevel === "all") {
      return vocabularyData;
    }
    return vocabularyData.filter(
      (item) => item.jlptLevel === selectedJLPTLevel,
    );
  }, [selectedJLPTLevel]);

  const getVocabularyCountByLevel = useCallback(() => {
    const counts: Record<string, number> = {
      N5: 0,
      N4: 0,
      N3: 0,
      N2: 0,
      N1: 0,
      All: vocabularyData.length,
    };

    vocabularyData.forEach((item) => {
      if (counts[item.jlptLevel] !== undefined) {
        counts[item.jlptLevel]++;
      }
    });

    return counts;
  }, []);

  const generateQuestions = useCallback(() => {
    const filteredVocabulary = getFilteredVocabulary();

    const shuffled = [...filteredVocabulary].sort(() => 0.5 - Math.random());

    const count = Math.min(questionLimit, shuffled.length);
    return shuffled.slice(0, count);
  }, [getFilteredVocabulary, questionLimit]);

  const generateOptions = useCallback(
    (currentQuestion: VocabularyItem) => {
      const filteredVocabulary = getFilteredVocabulary();
      let otherOptions = filteredVocabulary.filter(
        (item) => item.id !== currentQuestion.id,
      );

      otherOptions = otherOptions.sort(() => 0.5 - Math.random()).slice(0, 3);

      const allOptions = [currentQuestion, ...otherOptions];
      return allOptions.sort(() => 0.5 - Math.random());
    },
    [getFilteredVocabulary],
  );

  useEffect(() => {
    if (isQuizCompleted) {
      setIsTimerActive(false);
    }
  }, [isQuizCompleted]);

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
    if (
      newQuestionNumber >= questionLimit ||
      newQuestionNumber >= questions.length
    ) {
      setIsQuizCompleted(true);
    } else {
      setTimeout(() => {
        setCurrentQuestion(questions[newQuestionNumber]);
        setOptions(generateOptions(questions[newQuestionNumber]));
      }, 300);
    }
  };

  const startQuiz = () => {
    const filteredVocabulary = getFilteredVocabulary();

    if (filteredVocabulary.length === 0) {
      toast({
        title: "No words available",
        description: `No words found for level ${selectedJLPTLevel === "all" ? "all levels" : selectedJLPTLevel}. Please select another level.`,
        variant: "destructive",
      });
      return;
    }

    if (filteredVocabulary.length < 4) {
      toast({
        title: "Not enough words",
        description: `Only ${filteredVocabulary.length} words available. Please select a different level or reduce question limit.`,
        variant: "destructive",
      });
      return;
    }

    const newQuestions = generateQuestions();
    if (newQuestions.length === 0) return;

    setQuestions(newQuestions);
    setQuestionNumber(0);
    setScore(0);
    setStreak(0);
    setCurrentQuestion(newQuestions[0]);
    setOptions(generateOptions(newQuestions[0]));

    setIsQuizStarted(true);
    setIsQuizCompleted(false);
    setIsTimerActive(true);
    setShowModeSelector(false);
    setTimeLimit(selectedTimeLimit);
    setIsTimeUp(false);

    resetScroll();
  };

  const resetQuiz = () => {
    const newQuestions = generateQuestions();
    if (newQuestions.length === 0) return;

    setQuestions(newQuestions);
    setQuestionNumber(0);
    setScore(0);
    setStreak(0);
    setCurrentQuestion(newQuestions[0]);
    setOptions(generateOptions(newQuestions[0]));
    setIsQuizCompleted(false);
    setIsQuizStarted(true);
    setTimeLimit(selectedTimeLimit);
    setIsTimerActive(true);
    setIsTimeUp(false);
  };

  const changeModeAndRestart = () => {
    setShowModeSelector(true);
    setIsQuizStarted(false);
    setIsQuizCompleted(false);
    setCurrentQuestion(null);
    setOptions([]);
    setQuestions([]);
    setScore(0);
    setQuestionNumber(0);
    setStreak(0);
    setIsTimeUp(false);
    setIsTimerActive(true);
  };

  const handleTryAgain = () => {
    resetQuiz();
  };

  const handleTimeUp = () => {
    setIsTimeUp(true);
    setIsQuizCompleted(true);
  };

  const handleToggleTimer = () => {
    setIsTimerActive(!isTimerActive);
  };

  const toggleStatVisibility = (stat: string) => {
    setVisibleStats((prev) =>
      prev.includes(stat) ? prev.filter((s) => s !== stat) : [...prev, stat],
    );
  };

  const vocabularyCountByLevel = getVocabularyCountByLevel();

  return {
    // State
    currentQuestion,
    options,
    score,
    questionNumber,
    streak,
    questionLimit,
    quizMode,
    selectedJLPTLevel,
    isQuizStarted,
    showModeSelector,
    isQuizCompleted,
    visibleStats,
    timeLimit,
    selectedTimeLimit,
    isTimeUp,
    isTimerActive,
    vocabularyCountByLevel,

    // Actions
    setQuizMode,
    setSelectedJLPTLevel,
    setQuestionLimit,
    handleAnswer,
    startQuiz,
    resetQuiz,
    changeModeAndRestart,
    handleTryAgain,
    toggleStatVisibility,
    setTimeLimit,
    setSelectedTimeLimit,
    handleTimeUp,
    handleToggleTimer,
  };
};
