import { Injectable } from '@angular/core';
import { ChatState } from '../state/chat.state';
import { ChatMessage } from '../models/chat-message.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private abortController?: AbortController;


  constructor(
    private chatState: ChatState,
    private http:HttpClient
  ) { }

  //  sendMessage(content: string) {


  //    const userMessage: ChatMessage = {
  //      id: crypto.randomUUID(),
  //      role: 'user',
  //      content,
  //      createdAt: new Date()
  //    };
 
  //    this.chatState.addMessage(userMessage);
  //   return this.http.post<{ answer: string }>('https://localhost:7777/api/chat/send',{ message: content });
  



  // }

  

async streamMessage(message: string, onChunk: (chunk: string) => void) {

  this.abortController = new AbortController();




  const response = await fetch(
    'https://localhost:7777/api/chat/stream',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message }),
      signal: this.abortController?.signal
    }
  );

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  while (true) {

    const { value, done } = await reader!.read();
    if (done) break;

    const chunk = decoder.decode(value);

    chunk
      .split('\n\n')
      .forEach(line => {
        if (line.startsWith('data:')) {
          const data = line.replace('data:', '').trim();
          if (data === '[DONE]') return;
          onChunk(data);
        }
      });
  }
}






 

  stopGeneration() {

    this.abortController?.abort();

    //this.abortController = undefined;

    this.chatState.setStreaming(false);

  }
}