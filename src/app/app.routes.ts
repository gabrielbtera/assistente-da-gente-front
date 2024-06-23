import { Routes } from '@angular/router';
import { WebsocketDataComponent } from './components/websocket-data/websocket-data.component';

export const routes: Routes = [
  { path: 'websocket-client', component: WebsocketDataComponent },
  // Outras rotas, se houver
];
