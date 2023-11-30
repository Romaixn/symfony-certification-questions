interface QuestionInterface {
  question: string;
  answers: AnswerInterface[];
  explanation: string;
  images: string[];
  versionMin: number|null;
  versionMax: number|null;
}

interface AnswerInterface {
  answer: string;
  valid: boolean;
}