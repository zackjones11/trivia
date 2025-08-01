export type Question = {
  id: number;
  title: string;
  options: string[];
  correctAnswer: string;
};

export type SubmitAnswer = {
  usersAnswer: string;
};

export type ViewState = 'lobby' | 'question' | 'answer' | 'end';

export type Player = {
  id: string;
  username: string;
  score: number;
};

export type Settings = {
  categories: string[];
};

export type GameState = {
  hostId: Player['id'] | null;
  viewState: ViewState;
  players: Record<Player['id'], Player>;
  settings: Settings;
  questions: Question[];
  currentQuestionIndex: number;
  questionCount: number;
};
