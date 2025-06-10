import { Component, ElementRef, Input, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { musicalInstrumentModel } from '../../../models/instrument-model';
import { StringComponent } from "../string/string.component";
import { NutComponent } from "../nut/nut.component";
import { FretComponent } from "../fret/fret.component";
import { MappingService } from '../../../services/mapping.service';
import { noteModel } from '../../../models/note-model';
import { StylesService } from '../../../services/menu/styles.service';
import { fadeInOutAnimation, listAnimation } from '../../../definitions/animations.definitions';

@Component({
  selector: 'app-fretboard',
  standalone: true,
  imports: [StringComponent, NutComponent, FretComponent],
  templateUrl: './fretboard.component.html',
  styleUrl: './fretboard.component.css',
  animations: [fadeInOutAnimation, listAnimation]
})
export class FretboardComponent {
  @Input() color:string = 'mapple';
  @Input() instrument!: musicalInstrumentModel;
  @Input() notes!: noteModel[];
  @ViewChild('fretboard') neck!: ElementRef;
  @ViewChild('neckBg') neckBg!: ElementRef;
  fretSpaceBase = 1.5;
  maxFrets = 24;

  constructor(private styleService:StylesService){}

  ngAfterViewInit(){
    this.styleService.neckStyleChanges.subscribe((val)=>{
      this.styleService.setStyle(this.neckBg, 'background', val);
    });
    this.styleService.getNeckColor(this.color);

    const grid = this.generateGrid(this.instrument.fretNumber+2, this.instrument.baiscTuning.length);
    this.setGridToFretboard(grid);

  }

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

  public generateGrid(columns: number, rows: number): { [key: string]: string } {
    const initialColumnWidth = 40; // Largura da coluna final em pixels (a mais estreita)
    const columnWidthIncrement = 1.5; // Incremento da largura da coluna em pixels
    const rowHeight = 48; // Altura fixa da linha em pixels

    // Gerar grid-template-columns em ordem reversa
    let columnWidths: string[] = [];
    for (let i = 0; i < columns; i++) {
      // A largura é calculada como se estivéssemos indo da esquerda para a direita
      const columnWidth = initialColumnWidth + this.fretSpaceBase * (this.maxFrets - (i+1)) + 4 + 1.5;
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

}
