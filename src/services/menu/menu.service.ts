import { ElementRef, Injectable } from '@angular/core';
import { noteModel } from '../../models/note-model';
import { NoteComponent } from '../../components/basic/note/note.component';
import { StylesService } from './styles.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private styleService: StylesService) { }

  openNoteContextMenu(noteComponent:NoteComponent){
    console.log(noteComponent.note);
  }

  sendNoteToFilterList(){}
}
