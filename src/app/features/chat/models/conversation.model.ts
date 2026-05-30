import { ChatMessage } from "./chat-message.model";

export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;

  messages: ChatMessage[];
}