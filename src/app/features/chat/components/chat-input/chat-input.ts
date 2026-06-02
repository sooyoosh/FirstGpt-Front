import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { ChatState } from '../../state/chat.state';
import { ChatMessage } from '../../models/chat-message.model';

@Component({
  selector: 'app-chat-input',
  imports: [ButtonModule, TextareaModule, FormsModule],
  templateUrl: './chat-input.html',
  styleUrl: './chat-input.css',
})
export class ChatInput {
  chatState = inject(ChatState);
  private chatService = inject(ChatService);


  message = '';





  handleKeyDown(event: KeyboardEvent) {

    if (event.key === 'Enter' && !event.shiftKey) {

      event.preventDefault();

      this.send();
    }
  }
  async send() {

    if (!this.message.trim()) return;
    const content = this.message;

    this.message = '';


    //add user message
       const userMessage: ChatMessage = {
         id: crypto.randomUUID(),
         role: 'user',
         content,
         createdAt: new Date()
       };

       this.chatState.addMessage(userMessage);
    //add user message




    const assistantMessageId = crypto.randomUUID();

    this.chatState.addMessage({
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      createdAt: new Date(),
      isStreaming: true
    });




    this.chatService.streamMessage(content, (chunk) => {

      this.chatState.appendToMessage(
        assistantMessageId,
        chunk
      );

    });

  }


  stop() {

    this.chatService.stopGeneration();

  }
}
