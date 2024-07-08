import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputGroupModule } from 'primeng/inputgroup';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-response-chat',
  templateUrl: './response-chat.component.html',
  styleUrls: ['./response-chat.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MarkdownModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    InputGroupModule,
    MessagesModule,
  ],
  providers: [],
})
export class ResponseChatComponent {
  @Input() flag: boolean = false;
  @Input() textResponse = '';
  @Input() flagError?: boolean;
  @Input() msg = 'Aconteceu um erro com o nosso servico, tente novamente!';

  @Output() scroll: EventEmitter<void> = new EventEmitter<void>();
}
