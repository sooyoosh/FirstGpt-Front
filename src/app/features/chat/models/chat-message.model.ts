export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;

  isStreaming?: boolean;
  isError?: boolean;
}