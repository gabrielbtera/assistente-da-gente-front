import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subject, repeat, retry, takeUntil } from 'rxjs';
import { WebsocketService } from '../../services/websocket.service';
import { InputChatComponent } from '../input-chat/input-chat.component';
import { ResponseChatComponent } from '../response-chat/response-chat.component';
import { ChipModule } from 'primeng/chip';
import { SelecButtonComponent } from '../selec-button/selec-button.component';
import { SpeechSynthesisModule } from '@ng-web-apis/speech';

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
    SpeechSynthesisModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  historyChat: History[] = [];

  prompt: string = '';

  talk: any;

  @ViewChild('scrollContainer') scrollContainerRef!: ElementRef;
  @ViewChild(InputChatComponent) filhoComponent!: InputChatComponent;

  outputChat = '';
  flag = false;
  disabled = false;

  private destroy$ = new Subject<void>();

  text = 'Seja bem vindo!';

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

    console.log(this.optionRequest);

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
            this.text =
              this.historyChat[this.historyChat.length - 1].outputChat;
            this.speak(this.text);
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
          console.log(err);
          console.log('error');
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

  getTest() {
    this
      .speak(`O erro ReferenceError: SpeechSynthesisUtterance is not defined sugere que o objeto SpeechSynthesisUtterance não está disponível no contexto onde está sendo utilizado. Isso geralmente ocorre quando o código é executado em um ambiente onde a API de Web Speech não está presente, como durante a construção do aplicativo no lado do servidor.

Aqui está uma abordagem para resolver esse problema, garantindo que a API só seja utilizada no ambiente do navegador:`);
  }

  speak(text: string) {
    var utterThis = new SpeechSynthesisUtterance(text);

    this.talk = utterThis;
  }
  error(event: any) {
    console.log(event);
  }
}
