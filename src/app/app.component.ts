import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketDataComponent } from './components/websocket-data/websocket-data.component';
import { InputChatComponent } from './components/input-chat/input-chat.component';
import { MainComponent } from './components/main/main.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    WebsocketDataComponent,
    InputChatComponent,
    MainComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'websocket-client';
  @ViewChild('scrollContainer') scrollContainerRef!: ElementRef;

  scrollToBottom() {
    if (this.scrollContainerRef && this.scrollContainerRef.nativeElement) {
      const scrollContainer = this.scrollContainerRef.nativeElement;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }
}
