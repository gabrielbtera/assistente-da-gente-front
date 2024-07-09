import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

type Option = {
  label: string;
  value: string;
};

@Component({
  selector: 'app-selec-button',
  standalone: true,
  imports: [SelectButtonModule, FormsModule],
  templateUrl: './selec-button.component.html',
  styleUrl: './selec-button.component.css',
})
export class SelecButtonComponent {
  stateOptions: Option[] = [
    { label: 'Gemini', value: 'G' },
    { label: 'Lamma3', value: 'L' },
  ];

  value = 'L';

  @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();

  onSelectChange(event: any) {
    console.log('Valor selecionado no filho:', event);

    this.valueChanged.emit(event);
  }
}
