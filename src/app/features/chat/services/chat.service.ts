import { Injectable } from '@angular/core';
import { ChatState } from '../state/chat.state';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private abortController?: AbortController;


  constructor(
    private chatState: ChatState,
    
  ) { }

  async sendMessage(content: string) {

    if (!content.trim()) return;
    this.abortController = new AbortController();

    // user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      createdAt: new Date()
    };

    this.chatState.addMessage(userMessage);

    // empty assistant message
    const assistantMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      createdAt: new Date(),
      isStreaming: true
    };

    this.chatState.addMessage(assistantMessage);

    this.chatState.setStreaming(true);

    // fake ai response
    const fakeResponse =
      'سلام 👋 این یک پاسخ تستی برای شبیه‌سازی استریم مدل هوش مصنوعی داش سروش است.';


    try {

      await this.fakeStream(
        assistantMessage.id,
        fakeResponse
      );

    } finally {

      this.chatState.setStreaming(false);
    }



  }

  private async fakeStream(
    messageId: string,
    text: string
  ) {

    for (let i = 0; i < text.length; i++) {


      if (this.abortController?.signal.aborted) {

        this.chatState.finishStreaming(messageId);

        return;
      }



      await this.delay(25);

      if (this.abortController?.signal.aborted) {

        this.chatState.finishStreaming(messageId);

        return;
      }



      this.chatState.appendToMessage(
        messageId,
        text[i]
      );
    }

    this.chatState.finishStreaming(messageId);
    this.abortController = undefined;
  }

  private delay(ms: number) {
    return new Promise(resolve =>
      setTimeout(resolve, ms)
    );
  }

  stopGeneration() {

    this.abortController?.abort();

    //this.abortController = undefined;

    this.chatState.setStreaming(false);

  }
}