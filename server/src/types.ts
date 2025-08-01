export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
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

type CurrentQuestion = {
  count: number;
  id: number;
  title: string;
  options: string[];
  correctAnswer: string;
};

export type GameState = {
  hostId: Player['id'] | null;
  viewState: ViewState;
  players: Record<Player['id'], Player>;
  settings: Settings;
  questions: Question[];
  availableQuestions: Question[];
  currentQuestion: CurrentQuestion | undefined;
  questionCount: number;
  playerAnswers: PlayerAnswers;
};
