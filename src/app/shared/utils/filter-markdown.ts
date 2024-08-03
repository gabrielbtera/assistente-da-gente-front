export function stripMarkdown(text: string): string {
  // Remover negrito e itálico (* ou _)
  let cleanText = text.replace(/(\*|_){1,3}([^*|_]+)\1{1,3}/g, '$2');

  // Remover links [texto](url) ou ![alt](url)
  cleanText = cleanText.replace(/!?\[([^\]]+)\]\([^)]+\)/g, '$1');

  // Remover cabeçalhos (#)
  cleanText = cleanText.replace(/^\s{0,3}(#{1,6})\s*(.+)$/gm, '$2');

  // Remover citações (> texto)
  cleanText = cleanText.replace(/^\s{0,3}>\s*(.+)$/gm, '$1');

  // Remover código em linha (`código`)
  cleanText = cleanText.replace(/`([^`]+)`/g, '$1');

  // Remover código em bloco (``` código ``` ou ~~~ código ~~~)
  cleanText = cleanText.replace(/```\s*([\s\S]*?)\s*```/g, '$1');
  cleanText = cleanText.replace(/~~~\s*([\s\S]*?)\s*~~~/g, '$1');

  // Remover listas (- item, * item, + item, 1. item)
  // cleanText = cleanText.replace(/^\s*([-*+]|\d+\.)\s+/gm, '');

  // Remover riscado (~~texto~~)
  cleanText = cleanText.replace(/~~([^~]+)~~/g, '$1');

  // Remover tabelas
  cleanText = cleanText.replace(/\|/g, '');

  // Remover linhas horizontais (---, ***, ___)
  cleanText = cleanText.replace(/^-{3,}|^\*{3,}|^_{3,}$/gm, '');

  // Substituir "SEFAZ/SE" por "SEFAZ Sergipe"
  cleanText = cleanText.replace(/SEFAZ\/SE/g, 'SEFAZ Sergipe');
  cleanText = cleanText.replace(/Sefaz\/SE/g, 'SEFAZ Sergipe');

  return cleanText.trim();
}
