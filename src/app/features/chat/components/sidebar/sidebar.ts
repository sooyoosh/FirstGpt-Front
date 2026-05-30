import { Component } from '@angular/core';
import { ConversationItem } from '../conversation-item/conversation-item';




@Component({
  selector: 'app-sidebar',
  imports: [ConversationItem],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

chats = [
  {
    id: '1',
    title: 'Angular Chat UI'
  },

  {
    id: '2',
    title: 'PrimeNG Design'
  },

  {
    id: '3',
    title: 'Tailwind Layout'
  },

  {
    id: '4',
    title: 'Streaming Messages'
  }
];



  constructor(){}


}
