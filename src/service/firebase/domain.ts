export type Attempt = {
  username: string;
  start: number;
  finish: number;
};

export type Attempts = {
  [key: string]: Attempt;
};
