export interface Entry {
  name: string;
  uid: string;
  start: number;
  finish?: number;
}

export enum DatabasePath {
  LEADERBOARD = '/leaderboard',
  ENTRY = '/entries',
}

export interface Leaderboard {
  entries?: {
    [key: string]: Entry;
  };
  createdAt: number;
}
export interface DatabaseSchema {
  leaderboard: {
    [key: string]: Leaderboard;
  };
}
