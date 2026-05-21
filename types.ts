export enum Topic {
  GRAMMAR = "grammar",
  NUMBERS = "numbers",
  TIME = "time",
  WEATHER = "weather",
  MONTHS = "months",
  DIALOGUES = "dialogues"
}

export interface VocabularyItem {
  spanish: string;
  armenian: string;
  transcription?: string;
  exampleSpanish?: string;
  exampleArmenian?: string;
}

export interface SentenceExercise {
  id: string;
  topic: Topic;
  armenian: string;
  spanish: string;
  wordsInOrder: string[]; // correct sequence of chips
  explanation: string;   // detailed Armenian explanation of the structure
}

export interface DialogueExchange {
  id: string;
  title: string;
  description: string;
  exchanges: {
    speaker: "A" | "B";
    speakerNameArm: string;
    spanish: string;
    armenian: string;
    explanation?: string;
  }[];
}

export interface DialogueQuizStep {
  speaker: string;
  promptSpanish: string;
  promptArmenian: string;
  options: {
    spanish: string;
    armenian: string;
    explanation: string;
  }[];
  correctIndex: number;
}

export interface DialogueQuiz {
  id: string;
  title: string;
  description: string;
  steps: DialogueQuizStep[];
}

export interface LessonData {
  topic: Topic;
  titleArm: string;
  titleEsp: string;
  descriptionArm: string;
  grammarExplanation: string; // Detailed sentence structure explanation in Armenian (rules, tips)
  vocabulary: VocabularyItem[];
  exercises: SentenceExercise[];
}
