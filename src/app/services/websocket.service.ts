import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

interface StreamResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  done_reason?: string;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
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
  private url = 'http://localhost:11435/api';

  constructor(private http: HttpClient) {}

  getStreamData(prompt: string): Observable<any> {
    const endpoint = this.url + '/generate';
    const body = {
      model: 'llama3',
      prompt: prompt,
      stream: true,
      options: {
        seed: 200,
        top_k: 20,
        top_p: 0.9,
        temperature: 0,
      },
    };

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

  private obterDadosDoEvento(event: any): string | void {
    console.log(event);
    switch (event.type) {
      case HttpEventType.Sent:
        console.log('Requisição enviada!');
        return '';
      case HttpEventType.DownloadProgress:
        console.log('evento', event);
        const objetosSeparados = event.partialText.trim().split('\n');
        const objeto = objetosSeparados[objetosSeparados.length - 1];
        const objetosJson = JSON.parse(objeto) as StreamResponse;

        if (!objetosJson.done) return objetosJson.response;
        return;
      case HttpEventType.ResponseHeader:
        console.log('Cabeçalhos da resposta recebidos!');
        return;
      case HttpEventType.Response:
        console.log('Resposta recebida completamente!', event.body);
        return;
      default:
        return;
    }
  }
}
