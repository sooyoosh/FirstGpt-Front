import { Component, Input } from '@angular/core';
import { ChatMessage } from '../../models/chat-message.model';

@Component({
  selector: 'app-message-item',
  imports: [],
  templateUrl: './message-item.html',
  styleUrl: './message-item.css',
})
export class MessageItem {

@Input({ required: true })
message!: ChatMessage;



constructor(){

}


}
