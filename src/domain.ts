export interface User {
  email: string;
  username: string;
  createAt: number;
  uid: string;
}

export interface Entry {
  uid: string;
  start: number;
  finish?: number;
  elapsed?: number;
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
  users: {
    [key: string]: User;
  };
  leaderboard: {
    [key: string]: Leaderboard;
  };
}
