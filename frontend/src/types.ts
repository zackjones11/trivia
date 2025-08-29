export type Player = {
  id: string;
  username: string;
  score: number;
  isHost: boolean;
};

export type ViewState = 'loading' | 'lobby' | 'question' | 'answer' | 'end';

export type Question = {
  title: string;
  options: string[];
  correctAnswer: string;
};

export type AnswerSubmissions = Record<Player['id'], string[]>;

export type CategoryGroup = {
  label: string;
  subCategories: string[];
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
  currentQuestionIndex: number;
  questions: Question[];
  phaseStartAt: number;
  categories: CategoryGroup[];
};
