export type Player = {
  id: string;
  name: string;
  score: string;
};

// TODO: Refactor status logic to be more uniform
export type Status =
  | 'join'
  | 'lobby'
  | 'loading'
  | 'show_question'
  | 'show_correct'
  | 'ended'
  | {
      status:
        | 'join'
        | 'lobby'
        | 'loading'
        | 'show_question'
        | 'show_correct'
        | 'ended';
      name: string;
    };

export type Question = {
  count: number;
  id: string;
  title: string;
  options: string[];
  correct_answer: string;
};

export type PlayerScores = Record<string, Record<string, boolean>>;
