import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WebsocketService } from '../../services/websocket.service';
import { InputChatComponent } from '../input-chat/input-chat.component';
import { ResponseChatComponent } from '../response-chat/response-chat.component';
import { ChipModule } from 'primeng/chip';

type History = {
  prompt: string;
  outputChat: string;
  flagLoading: boolean;
};

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ResponseChatComponent, InputChatComponent, ChipModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  historyChat: History[] = [];

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
    this.prompt = this.filhoComponent.prompt;

    this.historyChat.push({
      prompt: this.prompt,
      outputChat: '',
      flagLoading: true,
    });

    this.filhoComponent.prompt = '';

    this.disabled = true;
    this.llamaService
      .getStreamData(this.prompt)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        if (response && typeof response !== 'boolean') {
          this.updateCurrentPrompt(response);
          this.flag = false;
        } else if (typeof response === 'boolean') {
          this.disabled = false;
          console.log(this.historyChat);
        }

        this.scrollToBottom();
      });
  }

  cancelRequest(): void {
    this.destroy$.next();
    this.disabled = false;

    this.stopLoading();
  }

  stopLoading() {
    const size = this.historyChat.length;
    const element = this.historyChat[size - 1];
    if (element) {
      element.flagLoading = false;
      this.historyChat[size - 1] = element;
    }
  }

  scrollToBottom() {
    if (this.scrollContainerRef && this.scrollContainerRef.nativeElement) {
      const scrollContainer = this.scrollContainerRef.nativeElement;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }

  updateCurrentPrompt(chunk: string) {
    const size = this.historyChat.length;
    const element = this.historyChat[size - 1];
    const outputChat = element.outputChat + chunk;
    element.outputChat = outputChat;
    element.flagLoading = false;

    this.historyChat[size - 1] = element;
  }
}
