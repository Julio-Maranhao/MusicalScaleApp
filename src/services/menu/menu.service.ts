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
    const sameNoteIDs = this.noteList.filter(n => n.noteId == note.noteId);
    if (sameNoteIDs.length > 0) {this.removeNoteFromFilterList(note); return}
    this.noteList.push(note);
    this.onNoteListChanges.next(this.noteList);
  }

  removeNoteFromFilterList(note:noteModel){
    const noteToRemove = this.noteList.find(n => n.noteId == note.noteId);
    if (noteToRemove) {
      this.noteList.splice(this.noteList.indexOf(noteToRemove), 1);
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
        textColor: '#ffffff',
        noteName: NOTE_LIST[noteId],
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
        mode: 'all'
      }
      this.styleService.sendNoteStyleChange(newStyle)
    }
  }
}
