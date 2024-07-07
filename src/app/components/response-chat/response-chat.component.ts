import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputGroupModule } from 'primeng/inputgroup';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  ],
  providers: [],
})
export class ResponseChatComponent {
  @Input() flag: boolean = false;
  @Input() textResponse = '';

  @Output() scroll: EventEmitter<void> = new EventEmitter<void>();
}
