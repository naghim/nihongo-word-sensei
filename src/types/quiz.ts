import type { VocabularyItem } from "@/data/vocabulary";

export type QuizMode =
  | "kanji-to-english"
  | "romanji-to-english"
  | "english-to-kanji";

export interface QuizState {
  currentQuestion: VocabularyItem | null;
  options: VocabularyItem[];
  score: number;
  questionNumber: number;
  streak: number;
  questionLimit: number;
  quizMode: QuizMode;
  isQuizStarted: boolean;
  showModeSelector: boolean;
}

export interface QuizStats {
  score: number;
  total: number;
  percentage: number;
  streak: number;
}

// Re-export from vocabulary data
export type { VocabularyItem };
