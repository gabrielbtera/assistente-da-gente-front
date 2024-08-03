import { Component, Output, EventEmitter, Input } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputGroupModule } from 'primeng/inputgroup';
import { ProgressBarModule } from 'primeng/progressbar';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnimateAudioComponent } from '../../shared/components/animate-audio/animate-audio.component';

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
    ProgressBarModule,
    AnimateAudioComponent,
  ],
  templateUrl: './input-chat.component.html',
  styleUrl: './input-chat.component.css',
})
export class InputChatComponent {
  responseStream: string[] = [];
  prompt: string = '';
  @Input() speaking = false;

  @Input() speaking$ = new Observable<boolean>();
  @Input() disabled: boolean = false;
  @Output() emitResponse = new EventEmitter<string>();
  @Output() emitCancelRequest = new EventEmitter<void>();

  @Output() emitCancelSpeech = new EventEmitter<void>();

  getResponse() {
    this.emitResponse.emit();
  }

  cancelRequest() {
    this.emitCancelRequest.emit();
  }

  cancelSpeech() {
    const speakingSubject: BehaviorSubject<boolean> =
      new BehaviorSubject<boolean>(false);

    this.speaking$ = speakingSubject.asObservable();
    this.emitCancelSpeech.emit();
  }
}
