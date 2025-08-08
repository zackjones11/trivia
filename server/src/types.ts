type ViewState = 'loading' | 'lobby' | 'question' | 'answer' | 'end';

type Player = {
  id: string;
  username: string;
  score: number;
  isHost: boolean;
};

type Settings = {
  selectedCategories: string[];
  questionPhaseDuration: number;
  answerPhaseDuration: number;
};

export type Question = {
  id: number;
  title: string;
  options: string[];
  correctAnswer: string;
};

export type GameState = {
  viewState: ViewState;
  players: Record<Player['id'], Player>;
  answerSubmissions: Record<Player['id'], string>;
  settings: Settings;
  questions: Question[];
  currentQuestionIndex: number;
  phaseStartAt: number;
};
