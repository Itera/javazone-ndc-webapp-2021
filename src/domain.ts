export interface Entry {
  name: string;
  uid: string;
  start: number;
  finish?: number;
}

export interface DatabaseSchema {
  leaderboard: {
    [key: string]: {
      [key: string]: Entry | number;
      createdAt: number;
    };
  };
}
