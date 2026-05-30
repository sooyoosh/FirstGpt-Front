import { Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { MessageList } from "../message-list/message-list";
import { ChatInput } from "../chat-input/chat-input";
import { Sidebar } from "../sidebar/sidebar";
import { ChatState } from '../../state/chat.state';

@Component({
  selector: 'app-chat-layout',
  imports: [MessageList, ChatInput, Sidebar],
  templateUrl: './chat-layout.html',
  styleUrl: './chat-layout.css',
})
export class ChatLayout {

@ViewChild('messageContainer')
private messageContainer?: ElementRef<HTMLDivElement>;

chatState = inject(ChatState);


constructor() {

  effect(() => {

    this.chatState.messages();

    queueMicrotask(() => {

      const element =
        this.messageContainer?.nativeElement;

      if (!element) return;

      element.scrollTop =
        element.scrollHeight;

    });

  });

}




}
