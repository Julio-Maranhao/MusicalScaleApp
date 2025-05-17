import { Injectable } from '@angular/core';
import { DefinicaoAcorde, DEFINICOES_ACORDES, NOTA_PARA_ID, NOTE_LIST } from '../definitions/acordes.definitions';
import { AcordeParse } from '../models/note-model';

@Injectable({
  providedIn: 'root'
})
export class ChordService {
  chordList:AcordeParse[] = [];

  constructor() {
    for(const tonicaName of NOTE_LIST) {
      for (const def of this.getChordDefinitions()){
        const tonicaId = NOTA_PARA_ID[tonicaName];
        const chordParse:AcordeParse = {
          tonica: tonicaId,
          tonicaName: tonicaName,
          modificadorName: def.modificadorNome,
          resultFormula: def.formula.map(e => (e + tonicaId) % 12)
        };
        this.chordList.push(chordParse);
      }
    }
  }

  getChordDefinitions():DefinicaoAcorde[]{
    return [...DEFINICOES_ACORDES];
  }

  getChordNames():string[]{
    return this.chordList.map(e=> e.tonicaName + e.modificadorName);
  }

  getNoteNames():string[]{
    return [...NOTE_LIST];
  }

  getModificadoresDisponiveis(){
    return DEFINICOES_ACORDES.map(e => e.modificadorNome);
  }

  filterChordByName(name:string){
    return this.chordList.filter(e=> (e.tonicaName + e.modificadorName).includes(name));
  }

}
