import { ElementRef, Injectable } from '@angular/core';
import { noteModel, noteStyle } from '../../models/note-model';
import { NoteComponent } from '../../components/basic/note/note.component';
import { StylesService } from './styles.service';
import { Subject } from 'rxjs';
import { ID_PARA_NOTA_PADRAO, NOTE_LIST } from '../../definitions/acordes.definitions';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  noteList:noteModel[] = [];
  instrumentStringList:number[] = [];
  // Context Menu
  onNoteMenuChanges:Subject<NoteComponent> = new Subject<NoteComponent>();
  onMenuPositionChanges:Subject<MouseEvent> = new Subject<MouseEvent>();
  // Just to show on Center Menu
  onNoteListChanges:Subject<noteModel[]> = new Subject<noteModel[]>();
  onStringListChanges:Subject<number[]> = new Subject<number[]>();


  constructor(private styleService: StylesService) { }

  openNoteContextMenu(noteComponent:NoteComponent){
    this.onNoteMenuChanges.next(noteComponent);
  }

  sendContextMenuPosition(event: MouseEvent){
    this.onMenuPositionChanges.next(event);
  }

  addNoteToFilterList(note:noteModel){
    if (this.noteList.includes(note)){return}
    this.noteList.push(note);
    this.onNoteListChanges.next(this.noteList);
  }

  removeNoteFromFilterList(note:noteModel){
    if (this.noteList.includes(note)) {
      this.noteList.splice(this.noteList.indexOf(note), 1);
      this.onNoteListChanges.next(this.noteList);
    }
  }

  resetNoteList(){
    this.noteList = [];
    this.onNoteListChanges.next(this.noteList);
  }

  addInstrumentString(string:number){
    this.instrumentStringList.push(string);
    this.onStringListChanges.next(this.instrumentStringList);
  }

  removeInstrumentString(string:number){
    if (this.instrumentStringList.includes(string)) {
      this.instrumentStringList.splice(this.instrumentStringList.indexOf(string), 1);
      this.onStringListChanges.next(this.instrumentStringList);
    }
  }

  resetInstrumentStringList(){
    this.instrumentStringList = [];
    this.onStringListChanges.next(this.instrumentStringList);
  }

  filterByNoteList(noteList:noteModel[]){
    const noteIds:number[] = Object.keys(ID_PARA_NOTA_PADRAO).map(num => Number(num));
    const allNotes:noteModel[] = noteIds.map(noteId => {
      return {
        noteId: noteId,
        traste: 0,
        corda: 0,
        noteColor: '#000000',
        octave: 0,
        visibility: false
      }
    });
    for (const note of allNotes) {
      for (const note2 of noteList) {
        if (note.noteId == note2.noteId) {
          note.visibility = true;
        }
      }
      const newStyle:noteStyle = {
        note: note,
        textColor: 'white',
        mode: 'all'
      }
      this.styleService.sendNoteStyleChange(newStyle)
    }
  }
}
