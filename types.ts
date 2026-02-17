export interface TopUpPackage {
  id: string;
  amount: string;
  bonus?: string;
  price: number | string;
  currency: string;
}

export interface Game {
  id: string;
  name: string;
  image: string;
  description: string;
  packages: TopUpPackage[];
}

export type Language = 'ar';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface GeminiConfig {
    temperature: number;
    topK: number;
    topP: number;
    maxOutputTokens: number;
}