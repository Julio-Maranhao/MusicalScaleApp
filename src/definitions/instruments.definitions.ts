import { noteModel } from "../models/note-model";

export interface MusicalInstrument {
  name:string;
  fretNumber:number;
  baiscTuning: noteModel[];
  appearence: {
    fretboardColor:string;
    fretColor:string;
    nutColor:string;
    background: string;
    noteSize: string;
  }
}

export const DEFINICOES_INSTRUMENTOS:MusicalInstrument[] = [
  {
    name: "Guitarra Padrão",
    fretNumber: 22,
    baiscTuning: [
      {traste: 0, corda: 1, noteId: 4, octave: 4, noteColor: 'black'},   // e
      {traste: 0, corda: 2, noteId: 11, octave: 3, noteColor: 'black'},  // B
      {traste: 0, corda: 3, noteId: 7, octave: 3, noteColor: 'black'},   // G
      {traste: 0, corda: 4, noteId: 2, octave: 3, noteColor: 'black'},   // D
      {traste: 0, corda: 5, noteId: 9, octave: 2, noteColor: 'black'},   // A
      {traste: 0, corda: 6, noteId: 4, octave: 2, noteColor: 'black'},   // E
    ],
    appearence: { fretboardColor: "white", fretColor: "black", nutColor: "black", background: "white", noteSize: "medium"}
  },
  {
    name: "Baixo 5 Cordas",
    fretNumber: 22,
    baiscTuning: [
      {traste: 0, corda: 1, noteId: 7, octave: 3, noteColor: 'black'},   // G
      {traste: 0, corda: 2, noteId: 2, octave: 3, noteColor: 'black'},   // D
      {traste: 0, corda: 3, noteId: 9, octave: 2, noteColor: 'black'},   // A
      {traste: 0, corda: 4, noteId: 4, octave: 2, noteColor: 'black'},   // E
      {traste: 0, corda: 5, noteId: 11, octave: 1, noteColor: 'black'},  // B
    ],
    appearence: { fretboardColor: "white", fretColor: "black", nutColor: "black", background: "white", noteSize: "medium"}
  },
]
