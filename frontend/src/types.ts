export type Player = {
  id: string;
  username: string;
};

export type Status = 'join' | 'lobby' | 'question' | 'answer' | 'end';

export type Question = {
  count: number;
  id: string;
  title: string;
  options: string[];
  correctAnswer: string;
};

export type PlayerScores = Record<string, Record<string, boolean>>;

export type GameState = {
  hostId: Player['id'] | null;
  players: Player[];
  viewState: Status;
  question: Question;
  playerAnswers: PlayerScores;
};
