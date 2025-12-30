export enum Tab {
  BASICS = 'basics',
  REQUEST_RESPONSE = 'req-res',
  MITM = 'mitm',
  HANDSHAKE = 'handshake',
  EVOLUTION = 'evolution',
  QUIZ = 'quiz'
}

export type HttpMethod = 'GET' | 'POST' | 'DELETE';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface SimulationState {
  isPlaying: boolean;
  step: number;
  mode: 'http' | 'https';
}
