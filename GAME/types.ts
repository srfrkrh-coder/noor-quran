export interface Hadith {
  id: number;
  source: string;
  arabic: string;
  persian: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'nature';
  fontSize: 'normal' | 'large';
  apiKey: string;
}
