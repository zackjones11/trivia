export type Player = {
  id: string;
  username: string;
  score: number;
};

export type Status = 'join' | 'lobby' | 'question' | 'answer' | 'end';

export type Question = {
  id: string;
  title: string;
  options: string[];
  correctAnswer: string;
};

export type AnswerSubmissions = Record<Player['id'], string>;

export type GameState = {
  playerId: Player['id'] | null;
  hostId: Player['id'] | null;
  players: Player[];
  viewState: Status;
  question: Question | null;
  phaseStartAt: number;
  phaseDuration: number;
  answerSubmissions: AnswerSubmissions;
};
