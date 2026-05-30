import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { ChatState } from '../../state/chat.state';

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

    this.chatService.sendMessage(
      content
    );

  }


  stop() {

    this.chatService.stopGeneration();

  }
}
