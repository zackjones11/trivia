export type Player = {
  id: string;
  username: string;
  score: number;
  isHost: boolean;
};

export type ViewState = 'loading' | 'lobby' | 'question' | 'answer' | 'end';

export type Question = {
  id: string;
  title: string;
  options: string[];
  correctAnswer: string;
};

export type AnswerSubmissions = Record<Player['id'], string>;

export type CategoryGroup = {
  label: string;
  subCategories: {
    value: string;
    text: string;
  }[];
};

export type Settings = {
  selectedCategories: string[];
  numberOfQuestions: number;
  questionPhaseDuration: number;
  answerPhaseDuration: number;
};

export type GameState = {
  viewState: ViewState;
  players: Player[];
  answerSubmissions: AnswerSubmissions;
  settings: Settings;
  question: Question | null;
  phaseStartAt: number;
  categories: CategoryGroup[];
};
