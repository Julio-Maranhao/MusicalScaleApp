import { Component, ViewChild } from '@angular/core';
import { noteModel } from '../../../models/note-model';
import { MenuService } from '../../../services/menu/menu.service';
import { StylesService } from '../../../services/menu/styles.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InstrumentService } from '../../../services/musical/instrument.service';
import { ChordService } from '../../../services/musical/chord.service';
import { ScaleService } from '../../../services/musical/scale.service';
import { ID_PARA_NOTA_PADRAO } from '../../../definitions/acordes.definitions';
import { NoteComponent } from '../../basic/note/note.component';

@Component({
  selector: 'app-center-menu',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './center-menu.component.html',
  styleUrl: './center-menu.component.css'
})
export class CenterMenuComponent {
  @ViewChild('noteFilter') noteFilterRef!:HTMLElement;
  noteList:noteModel[] = [];
  formControl = new FormControl('');
  isOpen:boolean = true;
  isInstrumentOpen:boolean = false;
  isScaleOpen:boolean = false;
  isNoteOpen:boolean = false;

  constructor(
    private menuService:MenuService,
    private stylesService:StylesService,
    private instrumentService:InstrumentService,
    private chordService:ChordService,
    private scaleService:ScaleService
  ){}

  ngOnInit(){
    this.menuService.onNoteListChanges.subscribe(list => {
      this.noteList = list.map(note => {note.visibility = true; return note});
      this.menuService.filterByNoteList(this.noteList);
    });
  }

  toggleOpen(event:Event){
    const ele = event.target as HTMLElement;
    ele.classList.toggle('menu-active');
    setTimeout(() => {
      ele.classList.toggle('menu-active');
    }, 500)
    this.isOpen = !this.isOpen;
  }

  getNoteName(note:noteModel){return ID_PARA_NOTA_PADRAO[note.noteId];}

  generateNoteStyle(note:noteModel){
    let style = '';
    style += `background-color: ${note.noteColor};`;
    if(Object.keys(note).includes('textColor')){
      style += `color: ${note.textColor};`;
    } else {
      style += 'color: white;'
    }
    return style;
  }

  onClick(note:noteModel){
    this.menuService.removeNoteFromFilterList(note);
  }

  onContextMenu(event:MouseEvent, note:noteModel){
    event.preventDefault();
    const noteComp = new NoteComponent(this.stylesService, this.menuService);
    noteComp.note = note;
    noteComp.behavior = 'all';
    this.menuService.openNoteContextMenu(noteComp);
    this.menuService.sendContextMenuPosition(event);
    event.stopPropagation();
  }
}
