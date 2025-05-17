export interface DefinicaoAcorde {
  modificadorNome: string; // Ex: "m", "7", "maj7", "dim", "sus4", "79"
  formula: number[];       // Intervalos em semitons a partir da tônica 0 (ex: [0, 4, 7] para Maior)
  nomeCompletoExemplo?: string; // Ex: "Maior", "Menor", "Sétima Dominante"
  descricao?: string;     // Opcional
}

// Mapeamento de nomes de notas (e seus enarmônicos comuns) para noteId (0-11)
// Usado para parsear a tônica de uma string de acorde. Chaves em MAIÚSCULAS.
export const NOTA_PARA_ID: { [key: string]: number } = {
  'C': 0,
  'C#': 1, 'DB': 1,
  'D': 2,
  'D#': 3, 'EB': 3,
  'E': 4, 'FB': 4, // Fb é E
  'F': 5, 'E#': 5, // E# é F
  'F#': 6, 'GB': 6,
  'G': 7,
  'G#': 8, 'AB': 8,
  'A': 9,
  'A#': 10, 'BB': 10,
  'B': 11, 'CB': 11 // Cb é B
};

export const NOTE_LIST = ['C','C#', 'DB','D','D#', 'EB','E', 'FB','F', 'E#','F#', 'GB','G','G#', 'AB','A','A#', 'BB','B', 'CB'];

// Usado para converter noteId de volta para um nome de nota padrão (para exibição ou consistência)
export const ID_PARA_NOTA_PADRAO: { [key: number]: string } = {
  0: 'C', 1: 'C#', 2: 'D', 3: 'D#', 4: 'E', 5: 'F',
  6: 'F#', 7: 'G', 8: 'G#', 9: 'A', 10: 'A#', 11: 'B'
};

export const ID_PARA_NOTA_BEMOL: { [key: number]: string } = {
  0: 'C', 1: 'DB', 2: 'D', 3: 'EB', 4: 'E', 5: 'F',
  6: 'GB', 7: 'G', 8: 'AB', 9: 'A', 10: 'BB', 11: 'B'
};


export const DEFINICOES_ACORDES: DefinicaoAcorde[] = [
  // Tríades
  { modificadorNome: '', formula: [0, 4, 7], nomeCompletoExemplo: 'Maior' }, // Ex: C
  { modificadorNome: 'M', formula: [0, 4, 7], nomeCompletoExemplo: 'Maior (M)' }, // Ex: CM (alternativo)
  { modificadorNome: 'maj', formula: [0, 4, 7], nomeCompletoExemplo: 'Maior (maj)' }, // Ex: Cmaj (alternativo)
  { modificadorNome: 'm', formula: [0, 3, 7], nomeCompletoExemplo: 'Menor' }, // Ex: Cm
  { modificadorNome: 'min', formula: [0, 3, 7], nomeCompletoExemplo: 'Menor (min)' }, // Ex: Cmin (alternativo)
  { modificadorNome: 'aug', formula: [0, 4, 8], nomeCompletoExemplo: 'Aumentado' }, // Ex: Caug ou C+
  { modificadorNome: '+', formula: [0, 4, 8], nomeCompletoExemplo: 'Aumentado (+)' }, // Ex: C+
  { modificadorNome: 'dim', formula: [0, 3, 6], nomeCompletoExemplo: 'Diminuto' }, // Ex: Cdim ou C°
  { modificadorNome: '°', formula: [0, 3, 6], nomeCompletoExemplo: 'Diminuto (°)' }, // Ex: C°

  // Suspensos
  { modificadorNome: 'sus4', formula: [0, 5, 7], nomeCompletoExemplo: 'Suspenso com 4ª' }, // Ex: Csus4
  { modificadorNome: 'sus', formula: [0, 5, 7], nomeCompletoExemplo: 'Suspenso com 4ª (sus)' }, // Ex: Csus (sinônimo de sus4)
  { modificadorNome: 'sus2', formula: [0, 2, 7], nomeCompletoExemplo: 'Suspenso com 2ª' }, // Ex: Csus2

  // Sétimas
  { modificadorNome: '7', formula: [0, 4, 7, 10], nomeCompletoExemplo: 'Sétima Dominante' }, // Ex: C7
  { modificadorNome: 'maj7', formula: [0, 4, 7, 11], nomeCompletoExemplo: 'Sétima Maior' }, // Ex: Cmaj7 ou CM7
  { modificadorNome: 'M7', formula: [0, 4, 7, 11], nomeCompletoExemplo: 'Sétima Maior (M7)' }, // Ex: CM7
  { modificadorNome: 'm7', formula: [0, 3, 7, 10], nomeCompletoExemplo: 'Sétima Menor' }, // Ex: Cm7
  { modificadorNome: 'm(maj7)', formula: [0, 3, 7, 11], nomeCompletoExemplo: 'Menor com Sétima Maior' }, // Ex: Cm(maj7)
  { modificadorNome: 'dim7', formula: [0, 3, 6, 9], nomeCompletoExemplo: 'Sétima Diminuta' }, // Ex: Cdim7 ou C°7
  { modificadorNome: '°7', formula: [0, 3, 6, 9], nomeCompletoExemplo: 'Sétima Diminuta (°7)' }, // Ex: C°7
  { modificadorNome: 'm7b5', formula: [0, 3, 6, 10], nomeCompletoExemplo: 'Meio-Diminuto / Menor 7ª com 5ª diminuta' }, // Ex: Cm7b5 ou Cø
  { modificadorNome: 'ø', formula: [0, 3, 6, 10], nomeCompletoExemplo: 'Meio-Diminuto (ø)' }, // Ex: Cø

  // Sextas
  { modificadorNome: '6', formula: [0, 4, 7, 9], nomeCompletoExemplo: 'Sexta Maior' }, // Ex: C6
  { modificadorNome: 'm6', formula: [0, 3, 7, 9], nomeCompletoExemplo: 'Sexta Menor' }, // Ex: Cm6

  // Nonas (geralmente implicam a 7ª)
  { modificadorNome: '9', formula: [0, 4, 7, 10, 2], nomeCompletoExemplo: 'Nona Dominante' }, // C-E-G-Bb-D. (2 é 14%12)
  { modificadorNome: 'maj9', formula: [0, 4, 7, 11, 2], nomeCompletoExemplo: 'Nona Maior' }, // C-E-G-B-D
  { modificadorNome: 'M9', formula: [0, 4, 7, 11, 2], nomeCompletoExemplo: 'Nona Maior (M9)' }, // C-E-G-B-D
  { modificadorNome: 'm9', formula: [0, 3, 7, 10, 2], nomeCompletoExemplo: 'Nona Menor' }, // C-Eb-G-Bb-D

  // Add (sem a 7ª, a menos que especificado)
  { modificadorNome: 'add9', formula: [0, 4, 7, 2], nomeCompletoExemplo: 'Maior com Nona Adicionada' }, // C-E-G-D
  { modificadorNome: 'm(add9)', formula: [0, 3, 7, 2], nomeCompletoExemplo: 'Menor com Nona Adicionada' }, // C-Eb-G-D

  // Extensões e Alterações Comuns (podem ser combinadas ou expandidas)
  { modificadorNome: '7#9', formula: [0, 4, 7, 10, 3], nomeCompletoExemplo: 'Dominante com 7ª e 9ª aumentada' }, // Ex: C7#9 (Hendrix chord)
  { modificadorNome: '7b9', formula: [0, 4, 7, 10, 1], nomeCompletoExemplo: 'Dominante com 7ª e 9ª diminuta' }, // Ex: C7b9
  { modificadorNome: '7#5', formula: [0, 4, 8, 10], nomeCompletoExemplo: 'Dominante com 7ª e 5ª aumentada' }, // Ex: C7#5 ou C7aug
  { modificadorNome: '7b5', formula: [0, 4, 6, 10], nomeCompletoExemplo: 'Dominante com 7ª e 5ª diminuta' }, // Ex: C7b5

  // Definição especial do usuário
  // A fórmula [0,4,7,11,2] é C-E-G-B-D, que é um Cmaj9.
  // Se o usuário quer que '79' seja o nome para este, adicionamos.
  { modificadorNome: '79', formula: [0, 4, 7, 11, 2], nomeCompletoExemplo: 'Acorde "79" (como maj9)' }, // Ex: C79 (conforme solicitado)

  // Acordes de 11ª e 13ª (simplificados, geralmente omitem notas)
  // 11 (dominante): T, 3M, (5J), 7m, (9M), 11J  -> [0, 4, (7), 10, (2), 5] (a 3ª é frequentemente omitida)
  { modificadorNome: '11', formula: [0, 7, 10, 2, 5], nomeCompletoExemplo: 'Décima Primeira Dominante (3ª pode ser omitida)' },
  // m11: T, 3m, 5J, 7m, 9M, 11J -> [0, 3, 7, 10, 2, 5]
  { modificadorNome: 'm11', formula: [0, 3, 7, 10, 2, 5], nomeCompletoExemplo: 'Décima Primeira Menor' },
  // 13 (dominante): T, 3M, 5J, 7m, 9M, (11J), 13M -> [0, 4, 7, 10, 2, (5), 9] (11ª frequentemente omitida)
  { modificadorNome: '13', formula: [0, 4, 7, 10, 2, 9], nomeCompletoExemplo: 'Décima Terceira Dominante (11ª pode ser omitida)' },
];
