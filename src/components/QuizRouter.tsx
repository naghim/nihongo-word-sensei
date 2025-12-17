import { QuizWelcome } from "./QuizWelcome";
import { QuizGame } from "./QuizGame";
import { QuizResults } from "./QuizResults";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { vocabularyData } from "@/data/vocabulary";

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
    setQuizMode,
    setQuestionLimit,
    handleAnswer,
    startQuiz,
    resetQuiz,
    changeModeAndRestart,
    handleTryAgain,
    handleChangeModeFromResults,
  } = useQuizLogic();

  if (isQuizCompleted) {
    return (
      <QuizResults
        score={score}
        questionLimit={questionLimit}
        onTryAgain={handleTryAgain}
        onChangeMode={handleChangeModeFromResults}
      />
    );
  }

  if (!isQuizStarted) {
    return (
      <QuizWelcome
        vocabularyCount={vocabularyData.length}
        quizMode={quizMode}
        questionLimit={questionLimit}
        showModeSelector={showModeSelector}
        onModeChange={setQuizMode}
        onQuestionLimitChange={setQuestionLimit}
        onStartQuiz={startQuiz}
      />
    );
  }

  return (
    <QuizGame
      currentQuestion={currentQuestion}
      options={options}
      quizMode={quizMode}
      score={score}
      questionLimit={questionLimit}
      questionNumber={questionNumber}
      streak={streak}
      onAnswer={handleAnswer}
      onChangeMode={changeModeAndRestart}
      onReset={resetQuiz}
    />
  );
};

export default QuizRouter;
