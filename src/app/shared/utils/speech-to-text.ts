export class SpeechUtils {
  private static isBrowser: boolean = typeof window !== 'undefined';
  private static resumeTimeoutId?: any;
  public static resumeFlag: boolean = true;

  public utterance!: SpeechSynthesisUtterance;

  /**
   * Fala o texto fornecido.
   * @param text Texto a ser falado.
   */
  public speak(text: string): void {
    if (SpeechUtils.isBrowser && 'speechSynthesis' in window) {
      SpeechUtils.cancel(); // Cancela qualquer fala anterior

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = 0.8;
      utterance.rate = 1.2;
      utterance.pitch = 1;
      utterance.lang = 'pt-BR'; // Define o idioma como português do Brasil

      utterance.onstart = () => {
        SpeechUtils.startResumeInfinity();
      };

      utterance.onend = () => {
        SpeechUtils.stopResumeInfinity();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Text-to-Speech not supported in this environment.');
    }
  }

  /**
   * Cancela qualquer fala em andamento.
   */
  public static cancel(): void {
    if (SpeechUtils.isBrowser && 'speechSynthesis' in window) {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
      }
    }
  }

  /**
   * Inicia a função de pausa e retomada infinita.
   */
  private static startResumeInfinity(): void {
    SpeechUtils.resumeFlag = true;
    SpeechUtils.resumeTimeoutId = setTimeout(SpeechUtils.resumeSpeech, 2000);
  }

  /**
   * Retoma a fala a cada 2 segundos.
   */
  private static resumeSpeech(): void {
    if (SpeechUtils.resumeFlag) {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
      SpeechUtils.resumeTimeoutId = setTimeout(SpeechUtils.resumeSpeech, 2000);
    }
  }

  /**
   * Para a função de pausa e retomada e limpa o timeout.
   */
  private static stopResumeInfinity(): void {
    console.log('Fala finalizou');
    window.speechSynthesis.cancel();
    SpeechUtils.resumeFlag = false;
    if (SpeechUtils.resumeTimeoutId) {
      clearTimeout(SpeechUtils.resumeTimeoutId);
    }
  }
}
