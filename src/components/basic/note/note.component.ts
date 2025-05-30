import { Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { noteModel, noteStyle } from '../../../models/note-model';
import { ID_PARA_NOTA_PADRAO } from '../../../definitions/acordes.definitions';
import { StylesService } from '../../../services/menu/styles.service';
import { Subscription } from 'rxjs';
import { MenuService } from '../../../services/menu/menu.service';
import { MenuOptionObject } from '../../../models/other-model';

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
  @Input() behavior: 'single' | 'all' = 'single';
  @ViewChild('note') noteRef!:ElementRef;
  private styleSubscription: Subscription | undefined;

  fretSpaceBase = 1.5;
  maxFrets = 24;
  marginLeft = signal('');

  constructor(private stylesService: StylesService, private menuService:MenuService){}

  ngOnInit(){
    this.styleSubscription = this.stylesService.noteStyleChanges.subscribe(style => {
      if (style.mode == 'all') {
        if (style.note.noteId == this.note.noteId) {
          this.stylesService.setStyle(this.noteRef, 'background', style.note.noteColor);
          this.stylesService.setStyle(this.noteRef, 'color', style.textColor);
        }
      } else {
        if (
          style.note.noteId == this.note.noteId &&
          style.note.traste == this.note.traste &&
          style.note.corda == this.note.corda
        ) {
          this.stylesService.setStyle(this.noteRef, 'background', style.note.noteColor);
          this.stylesService.setStyle(this.noteRef, 'color', style.textColor);
        }
      }
    });
    let leftMargin = -.82 + this.fretSpaceBase * (this.maxFrets - (this.note.traste-1));
    if (this.note.traste == 0) {
      leftMargin = 0;
    }
    this.marginLeft.set(`margin-left:${leftMargin}px;`);
  }

  ngAfterViewInit(){
    this.stylesService.setStyle(this.noteRef, 'background', this.note.noteColor);
    this.stylesService.setStyle(this.noteRef, 'color', 'white');
  }

  getNoteName(){
    return ID_PARA_NOTA_PADRAO[this.note.noteId];
  }

  onClick(event:MouseEvent){
    this.menuService.openNoteContextMenu(this);
    this.menuService.sendContextMenuPosition(event);
    event.stopPropagation();
  }

  onContextMenu(){

  }

  pickColor(){
    const nStyle:noteStyle = {
      note: this.note,
      textColor: 'white',
      mode: this.behavior
    }
    this.stylesService.sendNoteStyleChange(nStyle);
  }

  ngOnDestroy(){
    if (this.styleSubscription) {
      this.styleSubscription.unsubscribe();
    }
  }
}
