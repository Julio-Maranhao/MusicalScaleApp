import { musicalInstrument } from "./instrument-model";
import { musicalNote } from "./note-model"

export type mapping = {
  name:string;
  notes:musicalNote[];
  instrument:musicalInstrument;
}
