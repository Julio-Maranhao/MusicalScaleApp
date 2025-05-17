import { musicalInstrumentModel } from "./instrument-model";
import { noteModel } from "./note-model"

export interface mapping {
  name:string;
  type:'scale'|'chord'|'notes';
  notes:noteModel[];
  instrument:musicalInstrumentModel;
}
