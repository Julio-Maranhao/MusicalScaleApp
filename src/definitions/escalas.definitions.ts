export interface FormulaEscala {
  nome: string;
  formula: number[]; // Array de noteIds relativos à tônica C=0
  descricao?: string; // Opcional
}

export const DEFINICOES_ESCALAS: FormulaEscala[] = [
  {
    nome: 'Jônio (Maior)',
    formula: [0, 2, 4, 5, 7, 9, 11], // C, D, E, F, G, A, B
    descricao: 'Modo maior, alegre e brilhante.'
  },
  {
    nome: 'Dórico',
    formula: [0, 2, 3, 5, 7, 9, 10], // C, D, Eb, F, G, A, Bb
    descricao: 'Modo menor com uma sexta maior, melancólico mas com um toque de esperança.'
  },
  {
    nome: 'Frígio',
    formula: [0, 1, 3, 5, 7, 8, 10], // C, Db, Eb, F, G, Ab, Bb
    descricao: 'Modo menor com uma segunda menor, sonoridade espanhola ou flamenca.'
  },
  {
    nome: 'Lídio',
    formula: [0, 2, 4, 6, 7, 9, 11], // C, D, E, F#, G, A, B
    descricao: 'Modo maior com uma quarta aumentada, etéreo e sonhador.'
  },
  {
    nome: 'Mixolídio',
    formula: [0, 2, 4, 5, 7, 9, 10], // C, D, E, F, G, A, Bb
    descricao: 'Modo maior com uma sétima menor, comum no blues e rock (escala dominante).'
  },
  {
    nome: 'Eólio (Menor Natural)',
    formula: [0, 2, 3, 5, 7, 8, 10], // C, D, Eb, F, G, Ab, Bb
    descricao: 'Modo menor padrão, triste ou sério.'
  },
  {
    nome: 'Lócrio',
    formula: [0, 1, 3, 5, 6, 8, 10], // C, Db, Eb, F, Gb, Ab, Bb
    descricao: 'Modo com um trítono na tônica, dissonante e raramente usado como base tonal.'
  },
  {
    nome: 'Pentatônica Maior',
    formula: [0, 2, 4, 7, 9],       // C, D, E, G, A
    descricao: 'Escala de cinco notas, versátil e popular em muitos gêneros.'
  },
  {
    nome: 'Pentatônica Menor',
    formula: [0, 3, 5, 7, 10],      // C, Eb, F, G, Bb
    descricao: 'Escala de cinco notas, fundamental no blues, rock e pop.'
  },
  {
    nome: 'Escala de Blues',
    formula: [0, 3, 5, 6, 7, 10],   // C, Eb, F, F#, G, Bb
    descricao: 'Pentatônica menor com uma nota de passagem adicional (blue note).'
  },
  {
    nome: 'Menor Harmônica',
    formula: [0, 2, 3, 5, 7, 8, 11], // C, D, Eb, F, G, Ab, B
    descricao: 'Escala menor com uma sétima maior, criando uma sonoridade oriental ou neoclássica.'
  },
  {
    nome: 'Menor Melódica (Ascendente)',
    formula: [0, 2, 3, 5, 7, 9, 11], // C, D, Eb, F, G, A, B
    descricao: 'Escala menor com sexta e sétima maiores na subida, frequentemente diferente na descida (igual à menor natural).'
  },
  {
    nome: 'Cromática',
    formula: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // Todas as 12 notas
    descricao: 'Contém todas as doze notas da oitava.'
  }
];
