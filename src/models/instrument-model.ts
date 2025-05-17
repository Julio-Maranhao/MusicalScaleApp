import { noteModel } from "./note-model";

export type musicalInstrumentModel = {
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
