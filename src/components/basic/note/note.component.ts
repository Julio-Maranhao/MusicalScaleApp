import { Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { noteModel, noteStyle } from '../../../models/note-model';
import { ID_PARA_NOTA_PADRAO } from '../../../definitions/acordes.definitions';
import { StylesService } from '../../../services/menu/styles.service';
import { Subscription } from 'rxjs';
import { MenuService } from '../../../services/menu/menu.service';

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
  @Input() neckID:number = 0;
  @ViewChild('note') noteRef!:ElementRef;
  visibility = true;
  private styleSubscription: Subscription | undefined;

  fretSpaceBase = 1.5;
  maxFrets = 24;
  marginLeft = signal('');

  constructor(private stylesService: StylesService, private menuService:MenuService){}

  ngOnInit(){
    if (this.note.visibility !== undefined && this.note.visibility !== null) {
      this.visibility = this.note.visibility;
    }
    this.styleSubscription = this.stylesService.noteStyleChanges.subscribe(style => {
      if (style.note.neckId) {
        if (!(style.note.neckId == this.neckID)) {return;}
      }
      if (style.mode == 'all') {
        if (style.note.noteId == this.note.noteId) {
          this.note.noteColor = style.note.noteColor;
          this.note.textColor = style.note.textColor;
          this.note.visibility = style.note.visibility;
          this.stylesService.setStyle(this.noteRef, 'background', style.note.noteColor);
          this.stylesService.setStyle(this.noteRef, 'color', style.note.textColor!);
          this.visibility = style.note.visibility!;
        }
      } else {
        if (
          style.note.noteId == this.note.noteId &&
          style.note.traste == this.note.traste &&
          style.note.corda == this.note.corda
        ) {
          this.note.noteColor = style.note.noteColor;
          this.note.textColor = style.note.textColor;
          this.note.visibility = style.note.visibility;
          this.stylesService.setStyle(this.noteRef, 'background', style.note.noteColor);
          this.stylesService.setStyle(this.noteRef, 'color', style.note.textColor!);
          this.visibility = style.note.visibility!;
        }
      }
      if (this.visibility) {
        this.stylesService.setStyle(this.noteRef, 'opacity', '1');
      } else {
        this.stylesService.setStyle(this.noteRef, 'opacity', '0');
      }
    });
  }

  ngAfterViewInit(){
    this.stylesService.setStyle(this.noteRef, 'background', this.note.noteColor);
    this.stylesService.setStyle(this.noteRef, 'color', 'white');
  }

  getNoteName(){
    return ID_PARA_NOTA_PADRAO[this.note.noteId];
  }

  getNoteTraste(){
    return this.note.traste;
  }

  getNoteCorda(){
    return this.note.corda;
  }

  onClick(event:MouseEvent){
    this.menuService.addNoteToFilterList(this.note);
    event.preventDefault();
    event.stopPropagation();
  }

  onContextMenu(event:MouseEvent){
    // if(this.note.visibility == false){return};
    event.preventDefault();
    this.menuService.openNoteContextMenu(this);
    this.menuService.sendContextMenuPosition(event);
    event.stopPropagation();
  }

  onDoubleClick(event:Event){
    event.preventDefault();
    console.log('double click')
  }

  pickColor(){
    const nStyle:noteStyle = {
      note: this.note,
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
