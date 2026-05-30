import { AfterViewChecked, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChatMessage } from "../../models/chat-message.model";
import { MessageItem } from '../message-item/message-item';
import { ChatState } from '../../state/chat.state';



@Component({
  selector: 'app-message-list',
  imports: [ButtonModule, MessageItem],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList implements AfterViewChecked {

  messages: ChatMessage[] = [];


  chateState = inject(ChatState);
  @ViewChild('scrollContainer')
  private scrollContainer?: ElementRef<HTMLDivElement>;



  constructor() { }


  ngAfterViewChecked(): void {
    //  this.scrollToBottom();
  }

// private scrollToBottom(): void {

//   requestAnimationFrame(() => {

//     const element =
//       this.scrollContainer?.nativeElement;

//     if (!element) return;

//     element.scrollTo({
//       top: element.scrollHeight,
//       behavior: 'smooth'
//     });

//   });
// }

}
