export type Question = {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
};

export type PlayerAnswers = Record<string, Record<string, boolean>>;

export type SubmitAnswer = {
  player: string;
  usersAnswer: string;
  questionId: number;
};

export type ViewState = 'lobby' | 'question' | 'answer' | 'end';

export type Player = {
  id: string;
  username: string;
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
  availableQuestions: Question[];
  currentQuestionIndex: number;
  playerAnswers: PlayerAnswers;
  timer: NodeJS.Timeout | undefined;
};
