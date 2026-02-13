import { QuizWelcome } from "./QuizWelcome";
import { QuizGame } from "./QuizGame";
import { QuizResults } from "./QuizResults";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { vocabularyData } from "@/data/vocabulary";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const QuizRouter = () => {
  const {
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
    isTimeUp,
    isTimerActive,
    setQuizMode,
    setQuestionLimit,
    handleAnswer,
    startQuiz,
    resetQuiz,
    changeModeAndRestart,
    handleTryAgain,
    toggleStatVisibility,
    handleTimeUp,
    setTimeLimit,
    setSelectedTimeLimit,
    handleToggleTimer,
  } = useQuizLogic();

  const layout = (component: React.ReactNode) => (
    <>
      <Header
        isQuizStarted={isQuizStarted}
        onChangeMode={changeModeAndRestart}
        onReset={resetQuiz}
      />
      <main>{component}</main>
      <Footer />
    </>
  );

  if (!isQuizStarted) {
    return layout(
      <QuizWelcome
        vocabularyCount={vocabularyData.length}
        quizMode={quizMode}
        questionLimit={questionLimit}
        showModeSelector={showModeSelector}
        visibleStats={visibleStats}
        timeLimit={selectedTimeLimit}
        onModeChange={setQuizMode}
        onQuestionLimitChange={setQuestionLimit}
        onStartQuiz={startQuiz}
        onToggleStat={toggleStatVisibility}
        onTimeLimitChange={setSelectedTimeLimit}
      />,
    );
  }

  return layout(
    <QuizGame
      currentQuestion={currentQuestion}
      options={options}
      quizMode={quizMode}
      score={score}
      questionLimit={questionLimit}
      questionNumber={questionNumber}
      streak={streak}
      visibleStats={visibleStats}
      timeLimit={timeLimit}
      isTimeUp={isTimeUp}
      isQuizCompleted={isQuizCompleted}
      onAnswer={handleAnswer}
      onChangeMode={changeModeAndRestart}
      onReset={resetQuiz}
      onTryAgain={handleTryAgain}
      onTimeUp={handleTimeUp}
      isTimerActive={isTimerActive}
      onToggleTimer={handleToggleTimer}
      setTimeLimit={setTimeLimit}
    />,
  );
};

export default QuizRouter;
