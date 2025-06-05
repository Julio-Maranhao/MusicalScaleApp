// src/app/utils/color-utils.ts (ou onde preferir)

/**
 * Retorna a cor de contraste (preto ou branco) para uma dada cor hexadecimal.
 * Usa a fórmula YIQ para determinar a luminância percebida.
 * @param hexColor Cor em formato hexadecimal (ex: "#RRGGBB" ou "#RGB").
 * @returns "#000000" (preto) ou "#FFFFFF" (branco).
 */
export function getContrastColor(hexColor: string): string {
  if (!hexColor) {
    console.warn('getContrastColor: Cor hexadecimal não fornecida, retornando preto por padrão.');
    return '#000000';
  }

  // Remove o '#' se presente
  let hex = hexColor.replace('#', '');

  // Converte hex de 3 dígitos para 6 dígitos (ex: #F000 -> #FF00000)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (hex.length !== 6) {
    console.warn(`getContrastColor: Formato de cor hexadecimal inválido: ${hexColor}, retornando preto por padrão.`);
    return '#000000'; // Cor padrão em caso de erro
  }

  // Converte hex para RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calcula a luminância percebida usando a fórmula YIQ
  // Veja: https://en.wikipedia.org/wiki/YIQ#From_RGB_to_YIQ
  // Ou uma fórmula mais simples e comum para este propósito:
  // (Red * 0.299 + Green * 0.587 + Blue * 0.114)
  // Multiplicamos por 299, 587, 114 para evitar floats e depois dividimos por 1000
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // O limiar comum é 128. Se a luminância for >= 128, a cor é considerada clara,
  // então usamos preto para contraste. Caso contrário, usamos branco.
  // Você pode ajustar este limiar se achar necessário (ex: 149, 150, 160).
  const threshold = 128;
  return yiq >= threshold ? '#000000' : '#FFFFFF';
}
