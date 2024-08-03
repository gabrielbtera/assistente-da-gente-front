import { BehaviorSubject, Observable } from 'rxjs';

export class SpeechUtils {
  private static isBrowser: boolean = typeof window !== 'undefined';
  private static resumeTimeoutId?: any;
  private static resumeFlag: boolean = true;

  public isSpeaking$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  /**
   * Fala o texto fornecido.
   * @param text Texto a ser falado.
   */
  public speak(text: string): void {
    if (SpeechUtils.isBrowser && 'speechSynthesis' in window) {
      this.cancel(); // Cancela qualquer fala anterior

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = 0.8;
      utterance.rate = 1.2;
      utterance.pitch = 1;
      utterance.lang = 'pt-BR'; // Define o idioma como português do Brasil

      utterance.onstart = () => {
        this.isSpeaking$.next(true);
        this.startResumeInfinity();
      };

      utterance.onend = () => {
        this.isSpeaking$.next(false);
        this.stopResumeInfinity();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Text-to-Speech not supported in this environment.');
    }
  }

  /**
   * Cancela qualquer fala em andamento.
   */
  public cancel(): void {
    if (SpeechUtils.isBrowser && 'speechSynthesis' in window) {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
      }
    }
  }

  /**
   * Inicia a função de pausa e retomada infinita.
   */
  private startResumeInfinity(): void {
    SpeechUtils.resumeFlag = true;
    SpeechUtils.resumeTimeoutId = setTimeout(() => this.resumeSpeech(), 2000);
  }

  /**
   * Retoma a fala a cada 2 segundos.
   */
  private resumeSpeech(): void {
    if (SpeechUtils.resumeFlag) {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
      SpeechUtils.resumeTimeoutId = setTimeout(() => this.resumeSpeech(), 2000);
    }
  }

  /**
   * Para a função de pausa e retomada e limpa o timeout.
   */
  private stopResumeInfinity(): void {
    console.log('Fala finalizou');
    window.speechSynthesis.cancel();
    SpeechUtils.resumeFlag = false;
    if (SpeechUtils.resumeTimeoutId) {
      clearTimeout(SpeechUtils.resumeTimeoutId);
    }
  }

  /**
   * Método para acessar o estado de fala como um Observable.
   * @returns Observable<boolean>
   */
  public getSpeakingState(): Observable<boolean> {
    return this.isSpeaking$.asObservable();
  }

  public cancelSpeech(): void {
    this.cancel();
    this.isSpeaking$.next(false);
    this.stopResumeInfinity();
  }
}
