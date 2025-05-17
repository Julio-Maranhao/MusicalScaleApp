export type noteModel = {
  traste:number;
  corda:number; //1-N
  noteId:number; //0-11
  octave:number; //0-8
  noteColor:string; // bg-color
}

export interface FiltrosNotas {
  noteIds?: number[];       // Lista de IDs de notas para incluir (ex: [0, 2, 4] para C, D, E)
  cordas?: number[];        // Lista de cordas para incluir (ex: [1, 2, 3])
  trasteMin?: number;       // Traste mínimo (inclusive)
  trasteMax?: number;       // Traste máximo (inclusive)
}

export interface AcordeParse {
  tonica: number;
  tonicaName:string;      // ex "C#", "Db"
  modificadorName:string; // ex "m7", "dim"
  resultFormula: number[];      // ex [0,3,7,10]
}
