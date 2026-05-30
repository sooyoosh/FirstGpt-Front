import { Routes } from '@angular/router';

export const routes: Routes = [

{path:'',
    loadComponent:()=>
     import('./features/chat/components/chat-layout/chat-layout').then(m=>m.ChatLayout)
}

];
