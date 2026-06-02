import { Component } from '@angular/core';
import { ConversationItem } from '../conversation-item/conversation-item';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';


@Component({
  selector: 'app-sidebar',
  imports: [ConversationItem,ButtonModule,AvatarModule,AvatarGroupModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

chats = [
  {
    id: '1',
    title: 'فواید خواب'
  },

  {
    id: '2',
    title: 'فواید کهیر'
  },

  {
    id: '3',
    title: 'سلام بر تو'
  },

  {
    id: '4',
    title: 'چت خوشکل'
  }
];



  constructor(){}


}
