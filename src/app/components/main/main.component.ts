import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { WebsocketService } from '../../services/websocket.service';
import { InputChatComponent } from '../input-chat/input-chat.component';
import { ResponseChatComponent } from '../response-chat/response-chat.component';

import { ChipModule } from 'primeng/chip';
import { SelecButtonComponent } from '../selec-button/selec-button.component';

import { stripMarkdown } from '../../shared/utils/filter-markdown';
import { SpeechUtils } from '../../shared/utils/speech-to-text';

type History = {
  prompt: string;
  outputChat: string;
  flagLoading: boolean;
  flagError?: boolean;
};

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ResponseChatComponent,
    InputChatComponent,
    ChipModule,
    SelecButtonComponent,
  ],
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

  private optionRequest = false;

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
      .getStreamData(this.prompt, this.optionRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response && typeof response !== 'boolean') {
            this.updateCurrentPrompt(response);
            this.flag = false;
          } else if (typeof response === 'boolean') {
            this.disabled = false;
            this.speak();
          }

          this.scrollToBottom();
        },
        error: (err) => {
          this.stopLoading();
          this.filhoComponent.prompt = this.prompt;
          this.updateCurrentPrompt(
            'Econteceu um problema no nosso servico, tente novamente!',
            true
          );
          this.disabled = false;
          console.error(err);
        },
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

  updateCurrentPrompt(chunk: string, flagError = false) {
    const size = this.historyChat.length;
    const element = this.historyChat[size - 1];
    const outputChat = element.outputChat + chunk;
    element.outputChat = outputChat;
    element.flagLoading = false;

    if (flagError) {
      element.flagError = true;
    }

    this.historyChat[size - 1] = element;
  }

  getoOptionLLM(event: string) {
    if (event === 'L') {
      this.optionRequest = false;
    } else {
      this.optionRequest = true;
    }
  }

  private speak() {
    const currentResponse =
      this.historyChat[this.historyChat.length - 1].outputChat;
    const speech = new SpeechUtils();
    speech.speak(stripMarkdown(currentResponse));
  }
}
