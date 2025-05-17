import { Injectable } from '@angular/core';
import { FiltrosNotas, noteModel } from '../models/note-model';
import { musicalInstrumentModel } from '../models/instrument-model';
import { Subject } from 'rxjs';
import { InstrumentService } from './instrument.service';

@Injectable({
  providedIn: 'root'
})
export class MappingService {
  notesList:noteModel[] = [];
  instrument:musicalInstrumentModel | undefined;
  onNotesChange:Subject<noteModel[]> = new Subject<noteModel[]>;
  onInstrumentChange:Subject<musicalInstrumentModel> = new Subject<musicalInstrumentModel>;

  // Store a MAP (scale or chords set of notes and one instrument)
  constructor(private _instrumentService:InstrumentService) {
    this.gerarGuitarraPadrao();
  }

  gerarGuitarraPadrao(){
    const guitarra:musicalInstrumentModel = this._instrumentService.getDefaultInstrument();
    this.instrument = guitarra;
    this.onInstrumentChange.next(guitarra);
    this.gerarBracoGuitarra(guitarra);
    this.onNotesChange.next(this.notesList);
  }

  gerarBracoGuitarra(instrument: musicalInstrumentModel) {
    this.notesList = [];
    this.instrument = instrument;

    for (const afCorda of instrument.baiscTuning) {
      for (let traste = 0; traste <= instrument.fretNumber; traste++) {
        // Cada traste aumenta a nota em um semitom
        const valorNotaAbsoluto = afCorda.noteId + traste;

        const notaId = valorNotaAbsoluto % 12; // Mapeia de volta para 0-11
        const oitava = afCorda.octave + Math.floor(valorNotaAbsoluto / 12); // Incrementa a oitava quando passa de B para C

        this.notesList.push({
          corda: afCorda.corda,
          traste: traste,
          noteId: notaId,
          octave: oitava,
          noteColor: '#fff'
        });
      }
    }
    //Send signals
    this.onInstrumentChange.next(this.instrument);
    this.onNotesChange.next(this.notesList);
  }

  atualizarNotasVisiveisManualmente(novasNotas: noteModel[]): void {
    this.onNotesChange.next(novasNotas);
  }

  resetarFiltros(){
    this.onNotesChange.next(this.notesList);
  }

  aplicarFiltroNotas(filtros: FiltrosNotas): void {
    const instrumento = this.instrument;
    if (!instrumento) {
      this.onNotesChange.next([]);
      return;
    }

    let notasFiltradas = [...this.notesList]; // Começa com todas as notas

    // Filtrar por noteId
    if (filtros.noteIds && filtros.noteIds.length > 0) {
      notasFiltradas = notasFiltradas.filter(nota => filtros.noteIds!.includes(nota.noteId));
    }

    // Filtrar por corda
    if (filtros.cordas && filtros.cordas.length > 0) {
      notasFiltradas = notasFiltradas.filter(nota => filtros.cordas!.includes(nota.corda));
    }

    // Filtrar por intervalo de trastes
    if (typeof filtros.trasteMin === 'number') {
      notasFiltradas = notasFiltradas.filter(nota => nota.traste >= filtros.trasteMin!);
    }
    if (typeof filtros.trasteMax === 'number') {
      notasFiltradas = notasFiltradas.filter(nota => nota.traste <= filtros.trasteMax!);
    }

    this.onNotesChange.next(notasFiltradas);
  }

}


