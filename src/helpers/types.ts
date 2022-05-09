export enum GameStatus {
  PENDING = 'PENDING',
  STARTED = 'STARTED',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  PLAYER = 'PLAYER',
}

export interface ErrorMessage {
  message: string;
  error?: any;
}

export interface GameInfo {
  id: number;
  uuid: string;
  gameName: string;
  gameStatus: GameStatus;
}

export interface ProfileData {
  id: number;
  username: string;
  role: UserRole;
  cards: string[];
}

export type PublicUserData = Omit<ProfileData, 'cards'>;

export interface Message {
  username: string;
  message: string;
  isAdmin: boolean;
}
