import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { MarkdownModule } from 'ngx-markdown';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-websocket-data',
  templateUrl: './websocket-data.component.html',
  styleUrls: ['./websocket-data.component.css'],
  standalone: true,
  imports: [FormsModule, MarkdownModule, CommonModule],
  providers: [],
})
export class WebsocketDataComponent implements OnInit {
  responseStream: string[] = [];
  prompt: string = '';

  teste = '';
  flag = false;

  constructor(private llamaService: WebsocketService) {}

  ngOnInit(): void {}

  getResponse() {
    this.teste = '';
    this.flag = true;
    this.llamaService.getStreamData(this.prompt).subscribe((response) => {
      if (response) this.teste += response;
      this.flag = false;
    });
  }
}
