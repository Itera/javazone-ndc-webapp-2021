export interface User {
  email: string;
  username: string;
  createAt: number;
  uid: string;
}

export interface Entry {
  username: string;
  start: number;
  finish: number;
  elapsed: number;
}

export enum DatabasePath {
  LEADERBOARD = "/leaderboard",
  ENTRY = "/entries",
  USERS = "/users",
  UNREGISTERED = "/unregistered",
}

export interface Leaderboard {
  entries?: Record<string, Entry>;
  createdAt: number;
}
export interface DatabaseSchema {
  users: Record<string, User>;
  leaderboard: Record<string, Leaderboard>;
}
