import { Routes } from '@angular/router';
import { ResponseChatComponent } from './components/response-chat/response-chat.component';

export const routes: Routes = [
  { path: 'websocket-client', component: ResponseChatComponent },
  // Outras rotas, se houver
];
