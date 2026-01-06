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
    setQuizMode,
    setQuestionLimit,
    handleAnswer,
    startQuiz,
    resetQuiz,
    changeModeAndRestart,
    handleTryAgain,
    toggleStatVisibility,
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

  if (isQuizCompleted) {
    return layout(
      <QuizResults
        score={score}
        questionLimit={questionLimit}
        onTryAgain={handleTryAgain}
        onChangeMode={changeModeAndRestart}
      />
    );
  }

  if (!isQuizStarted) {
    return layout(
      <QuizWelcome
        vocabularyCount={vocabularyData.length}
        quizMode={quizMode}
        questionLimit={questionLimit}
        showModeSelector={showModeSelector}
        visibleStats={visibleStats}
        onModeChange={setQuizMode}
        onQuestionLimitChange={setQuestionLimit}
        onStartQuiz={startQuiz}
        onToggleStat={toggleStatVisibility}
      />
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
      onAnswer={handleAnswer}
      onChangeMode={changeModeAndRestart}
      onReset={resetQuiz}
    />
  );
};

export default QuizRouter;
