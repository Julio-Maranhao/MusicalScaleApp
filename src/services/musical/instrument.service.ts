import { Injectable } from '@angular/core';
import { musicalInstrumentModel } from '../../models/instrument-model';
import { DEFINICOES_INSTRUMENTOS } from '../../definitions/instruments.definitions';
import { not } from 'rxjs/internal/util/not';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {
  instruments:musicalInstrumentModel[] = [];

  constructor() {
    this.getSavedInstruments();
  }

  getSavedInstruments(){
    this.instruments = DEFINICOES_INSTRUMENTOS.map(e=> e as musicalInstrumentModel);
  }

  getInstruments(){
    return this.instruments;
  }

  getDefaultInstrument(){
    return this.instruments[0];
  }

  getInstrumentsNames(){
    return this.instruments.map(e=> e.name);
  }

  filterInstrumentsByName(name:string) {
    return this.instruments.filter(e=> e.name.includes(name));
  }
}
