import { Component, Output, EventEmitter, Input } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputGroupModule } from 'primeng/inputgroup';

@Component({
  selector: 'app-input-chat',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    InputGroupModule,
  ],
  templateUrl: './input-chat.component.html',
  styleUrl: './input-chat.component.css',
})
export class InputChatComponent {
  responseStream: string[] = [];
  prompt: string = '';
  @Input() disabled: boolean = false;
  @Output() emitResponse = new EventEmitter<string>();
  @Output() emitCancelRequest = new EventEmitter<void>();

  getResponse() {
    this.emitResponse.emit();
  }

  cancelRequest() {
    this.emitCancelRequest.emit();
  }
}
