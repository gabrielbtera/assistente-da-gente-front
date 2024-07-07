import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WebsocketService } from '../../services/websocket.service';
import { InputChatComponent } from '../input-chat/input-chat.component';
import { ResponseChatComponent } from '../response-chat/response-chat.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ResponseChatComponent, InputChatComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  responseStream: string[] = [];
  prompt: string = '';

  @ViewChild('scrollContainer') scrollContainerRef!: ElementRef;
  @ViewChild(InputChatComponent) filhoComponent!: InputChatComponent;

  outputChat = '';
  flag = false;
  disabled = false;

  private destroy$ = new Subject<void>();

  constructor(private llamaService: WebsocketService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.cancelRequest();
  }

  getResponse() {
    this.outputChat = '';
    this.flag = true;
    this.disabled = true;
    this.llamaService
      .getStreamData(this.filhoComponent.prompt)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        if (response && typeof response !== 'boolean') {
          this.outputChat += response;
          this.flag = false;
          this.scrollToBottom();
        } else if (typeof response === 'boolean') {
          this.disabled = false;
        }
      });
  }

  cancelRequest(): void {
    console.log;
    this.destroy$.next();
    this.destroy$.complete();
    this.disabled = false;
    this.flag = false;
  }

  scrollToBottom() {
    if (this.scrollContainerRef && this.scrollContainerRef.nativeElement) {
      const scrollContainer = this.scrollContainerRef.nativeElement;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }
}
