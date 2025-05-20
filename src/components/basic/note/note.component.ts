import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { noteModel } from '../../../models/note-model';
import { ID_PARA_NOTA_PADRAO } from '../../../definitions/acordes.definitions';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {
  @Input() size!:string;
  @Input() note!: noteModel;
  @Output() noteClickEvent = new EventEmitter<noteModel>();
  fretSpaceBase = 1.5;
  maxFrets = 24;
  marginLeft = signal('');

  ngOnInit(){
    let leftMargin = -4 + this.fretSpaceBase * (this.maxFrets - this.note.traste);
    if (this.note.traste == 0) {
      leftMargin = 0;
    }
    this.marginLeft.set(`margin-left:${leftMargin}px; transform:translateX(-100%);`);

  }

  getNoteName(){
    return ID_PARA_NOTA_PADRAO[this.note.noteId];
  }

  sendNoteToNoteList(){
    this.noteClickEvent.emit(this.note);
  }
}
