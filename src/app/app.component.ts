import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketDataComponent } from './components/websocket-data/websocket-data.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WebsocketDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'websocket-client';
}
