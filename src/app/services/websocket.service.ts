import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

interface Message {
  role: string;
  content: string;
}

interface Response {
  model: string;
  created_at: string; // Consider using Date if you plan to handle this as a date object
  message: Message;
  done: boolean;
}

interface RequestData {
  model: string;
  prompt: string;
  stream: boolean;
  options: {
    seed: number;
    top_k: number;
    top_p: number;
    temperature: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private url = 'http://localhost:8000';

  flagSpinner = false;

  response = '';

  constructor(private http: HttpClient) {}

  getStreamData(prompt: string): Observable<any> {
    const endpoint = this.url;
    const body = { prompt, parametro: 0 };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json',
      reportProgress: true,
      observe: 'events' as 'events',
    };

    return this.http
      .post(endpoint, body, httpOptions)
      .pipe(map((event) => this.obterDadosDoEvento(event)));
  }

  private obterDadosDoEvento(event: any): string | void | boolean {
    switch (event.type) {
      case HttpEventType.Sent:
        console.log('Requisição enviada!');
        return '';
      case HttpEventType.DownloadProgress:
        const objetosSeparados = event.partialText.trim().split('\n');
        const objeto = objetosSeparados[objetosSeparados.length - 1];

        const objetosJson = JSON.parse(objeto) as Response;

        if (!objetosJson.done) {
          this.response += objetosJson.message.content;
          return objetosJson.message.content;
        }
        return;
      case HttpEventType.ResponseHeader:
        console.log('Cabeçalhos da resposta recebidos!');
        return;
      case HttpEventType.Response:
        console.log('Resposta recebida completamente!', event.body);
        return true;
      default:
        return;
    }
  }
}
