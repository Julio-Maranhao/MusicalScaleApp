import { ElementRef, Injectable } from '@angular/core';
import { noteModel } from '../../models/note-model';
import { NoteComponent } from '../../components/basic/note/note.component';
import { StylesService } from './styles.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  onNoteMenuChanges:Subject<NoteComponent> = new Subject<NoteComponent>();
  onMenuPositionChanges:Subject<MouseEvent> = new Subject<MouseEvent>();


  constructor(private styleService: StylesService) { }

  openNoteContextMenu(noteComponent:NoteComponent){
    this.onNoteMenuChanges.next(noteComponent);
  }

  sendContextMenuPosition(event: MouseEvent){
    this.onMenuPositionChanges.next(event);
  }

  sendNoteToFilterList(){}
}
