type ViewState = 'lobby' | 'question' | 'answer' | 'end';

type Player = {
  id: string;
  username: string;
  score: number;
};

type Settings = {
  categories: string[];
  phaseDuration: number;
};

export type Question = {
  id: number;
  title: string;
  options: string[];
  correctAnswer: string;
};

export type GameState = {
  hostId: Player['id'] | null;
  viewState: ViewState;
  players: Record<Player['id'], Player>;
  answerSubmissions: Record<Player['id'], string>;
  settings: Settings;
  questions: Question[];
  currentQuestionIndex: number;
  phaseStartAt: number;
};
