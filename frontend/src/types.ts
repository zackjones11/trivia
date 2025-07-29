export type Player = {
  id: string;
  name: string;
  score: string;
};

export type Status =
  | 'join'
  | 'lobby'
  | 'loading'
  | 'show_question'
  | 'show_correct'
  | 'ended';

export type Question = {
  count: number;
  id: string;
  title: string;
  options: string[];
  correct_answer: string;
};

export type PlayerScores = Record<string, Record<string, boolean>>;
