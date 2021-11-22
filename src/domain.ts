export interface Entry {
  uid: string;
  start: number;
  finish?: number;
}

export enum DatabasePath {
  LEADERBOARD = '/leaderboard',
  ENTRY = '/entries',
  USERS = '/users',
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
