interface QuestionInterface {
  question: string;
  answers: AnswerInterface[];
  explanations: string[];
  images: string[];
  versionMin: number|null;
  versionMax: number|null;
}

interface AnswerInterface {
  answer: string;
  valid: boolean;
}