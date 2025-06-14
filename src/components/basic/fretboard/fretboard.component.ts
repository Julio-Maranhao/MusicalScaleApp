import { Component, ElementRef, Input, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { musicalInstrumentModel } from '../../../models/instrument-model';
import { StringComponent } from "../string/string.component";
import { NutComponent } from "../nut/nut.component";
import { FretComponent } from "../fret/fret.component";
import { MappingService } from '../../../services/mapping.service';
import { noteModel } from '../../../models/note-model';
import { StylesService } from '../../../services/menu/styles.service';
import { fadeInOutAnimation, listAnimation } from '../../../definitions/animations.definitions';
import { NoteComponent } from "../note/note.component";
import { MenuService } from '../../../services/menu/menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fretboard',
  standalone: true,
  imports: [StringComponent, NutComponent, FretComponent, NoteComponent],
  templateUrl: './fretboard.component.html',
  styleUrl: './fretboard.component.css',
  animations: [fadeInOutAnimation, listAnimation]
})
export class FretboardComponent {
  @Input() color:string = 'mapple';
  @Input() instrument!: musicalInstrumentModel;
  @Input() notes!: noteModel[];
  @Input() neckId:number = 0;
  @Input() fretNumberPosition:'top'|'bottom' = 'bottom';
  @Input() fretNumberShow:'hover'|'always'|'never' = 'always';
  @ViewChild('fretboard') neck!: ElementRef;
  @ViewChild('neckBg') neckBg!: ElementRef;
  filteredNotes: noteModel[] = [];
  dotsPositions = [2,4,6,8,11,14,16,18,20,23];
  maxFrets = 24;
  noteClickOption = 'one';
  noteClickOptionsSubscription!:Subscription;
  noteStyleChangeSubscription!:Subscription;

  constructor(private styleService:StylesService, private menuService:MenuService){}

  ngOnInit(){
    // Click mode on notes
    this.noteClickOptionsSubscription = this.menuService.onNoteClickChanges.subscribe({
      next: (val)=>{this.noteClickOption = val;}
    });
    this.menuService.getNoteClickOption();
    // Listen to string and fret note changes
    this.noteStyleChangeSubscription = this.styleService.noteStyleChanges.subscribe({
      next: (val)=>{
        if (val.mode == 'string') {
          this.toggleNotesByString(val.note);
        } else if (val.mode == 'fret-start') {
          this.toggleNoteByFretStart(val.note);
        } else if (val.mode == 'fret-end') {
          this.toggleNoteByFretEnd(val.note);
        }
      }
    })
  }

  ngAfterViewInit(){
    this.styleService.neckStyleChanges.subscribe((val)=>{
      this.styleService.setStyle(this.neckBg, 'background', val);
    });
    this.styleService.getNeckColor(this.color);

    const grid = this.generateGrid(this.instrument.fretNumber+2, this.instrument.baiscTuning.length);
    this.setGridToFretboard(grid);

    for (const note of this.notes) {
      note.neckId = this.neckId;
      note.onHover = 'show';
      if(note.traste != 0){
        note.visibility = false;
      }
      this.styleService.sendNoteStyleChange({
        note: note,
        mode: 'single'
      });
    }

  }

  onClick(note:noteModel){
    this.toggleNoteVisibility(note);
  }

  toggleNoteVisibility(note:noteModel){
    if (this.noteClickOption == 'filter') {return;}
    note.visibility = !note.visibility;
    const mode = this.noteClickOption == 'all' ? 'all' : 'single';
    this.styleService.sendNoteStyleChange({
      note: note,
      mode: mode
    });
    if (note.visibility) {
      this.addNoteToFilteredList(note);
    } else {
      this.removeNoteFromFilteredList(note);
    }
  }

  addNoteToFilteredList(note:noteModel){
    if (this.filteredNotes.find(n => n.noteId == note.noteId)) {return;}
    this.filteredNotes.push(note);
  }
  removeNoteFromFilteredList(note:noteModel){
    if (!this.filteredNotes.find(n => n.noteId == note.noteId)) {return;}
    this.filteredNotes.splice(this.filteredNotes.indexOf(note), 1);
  }
  resetFilteredList(){
    this.filteredNotes = [];
  }

  toggleNotesByString(note:noteModel) {
    for (const note2 of this.filteredNotes) {
      if (note2.corda == note.corda) {
        note2.visibility = note.visibility;
        this.styleService.sendNoteStyleChange({
          note: note2,
          mode: 'single'
        });
      }
    }
  }

  toggleNoteByFretStart(note:noteModel) {
    for (const note2 of this.filteredNotes) {
      if (note2.traste < note.traste) {
        note2.visibility = false;
      } else {
        note2.visibility = true;
      }
      this.styleService.sendNoteStyleChange({
          note: note2,
          mode: 'single'
        });
    }
  }

  toggleNoteByFretEnd(note:noteModel) {
    for (const note2 of this.filteredNotes) {
      if (note2.traste > note.traste) {
        note2.visibility = false;
      } else {
        note2.visibility = true;
      }
      this.styleService.sendNoteStyleChange({
          note: note2,
          mode: 'single'
        });
    }
  }

  // GRID CREATION FORMULAS
  getRange(num:number){
    return new Array(num);
  }

  setGridToFretboard(gridObject: { [key: string]: string }){
    for (const property in gridObject) {
      if (gridObject.hasOwnProperty(property)) {
        this.styleService.setStyle(this.neck, property, gridObject[property]);
      }
    }
  }

  getNeckGridArea(){
    return `grid-area: 1/2/span 6/span ${this.instrument.fretNumber+1}`;
  }

  getFretGridArea(idx:number){
    return `grid-area: 1/${idx+2}/span 6/span 1`;
  }

  getStringGridArea(idx:number){
    return `grid-area: ${idx+1}/2/span 1/span ${this.instrument.fretNumber+1}`;
  }

  getNoteGridArea(note:noteModel){
    let area = '';
    area += `s${note.corda}f${note.traste+1}`;

    return `grid-area: ${area}`;
  }

  public generateGrid(columns: number, rows: number): { [key: string]: string } {
    const initialColumnWidth = 40; // Largura da coluna final em pixels (a mais estreita)
    const columnWidthIncrement = 1.5; // Incremento da largura da coluna em pixels
    const rowHeight = 48; // Altura fixa da linha em pixels

    // Gerar grid-template-columns em ordem reversa
    let columnWidths: string[] = [];
    for (let i = 0; i < columns; i++) {
      // A largura é calculada como se estivéssemos indo da esquerda para a direita
      const columnWidth = initialColumnWidth + columnWidthIncrement * (this.maxFrets - (i+1)) + 4 + 1.5;
      columnWidths.push(`${columnWidth}px`);
    }

    // Invertemos o array de larguras antes de juntá-lo em uma string
    const gridTemplateColumns = columnWidths.join(' ');

    // Gerar grid-template-rows (permanece igual)
    const gridTemplateRows = `repeat(${rows}, ${rowHeight}px)`;

    // Gerar grid-template-areas (permanece igual)
    let gridTemplateAreas = '';
    for (let i = 1; i <= rows; i++) {
      let rowArea = '"';
      for (let j = 1; j <= columns; j++) {
        rowArea += `s${i}f${j} `;
      }
      gridTemplateAreas += `${rowArea.trim()}" `;
    }

    return {
      'display': 'grid',
      'grid-template-columns': gridTemplateColumns,
      'grid-template-rows': gridTemplateRows,
      'grid-template-areas': gridTemplateAreas.trim()
    };
  }

  ngOnDestroy(){
    this.noteClickOptionsSubscription?.unsubscribe();
    this.noteStyleChangeSubscription?.unsubscribe();
  }

}
