type ViewState = 'loading' | 'lobby' | 'question' | 'answer' | 'end';

type Player = {
  id: string;
  username: string;
  score: number;
  isHost: boolean;
};

type Category = {
  value: string;
  text: string;
};

type CategoryGroup = {
  label: string;
  subCategories: Category[];
};

type Settings = {
  categories: CategoryGroup[];
  phaseDuration: number;
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
