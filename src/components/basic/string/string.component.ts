import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { noteModel } from '../../../models/note-model';
import { NoteComponent } from "../note/note.component";
import { StylesService } from '../../../services/menu/styles.service';
import { MappingService } from '../../../services/mapping.service';
import { fadeInOutAnimation, listAnimation, fadeSlideInOutAnimation } from '../../../definitions/animations.definitions';

@Component({
  selector: 'app-string',
  standalone: true,
  imports: [NoteComponent],
  templateUrl: './string.component.html',
  styleUrl: './string.component.css',
  animations: [fadeInOutAnimation, listAnimation, fadeSlideInOutAnimation]
})
export class StringComponent {
  @Input() stringNumber!:number;
  @Input() color:string = 'strings';
  @Input() thickness:'thin' | 'large' = 'thin';
  @Input() notes!: noteModel[];
  @Input() fretQtd!:number;
  @ViewChild('string') string!:ElementRef;
  filteredNotes:noteModel[] = [];

  constructor(private stylesService:StylesService){}

  ngOnInit(){
    if (this.notes && this.stringNumber) {
      this.filteredNotes = this.notes.filter(e => e.corda == this.stringNumber);
    }
  }

  ngAfterViewInit(){
    this.stylesService.stringStyleChanges.subscribe(val => {
      this.stylesService.setStyle(this.string, 'background', val);
    });
    this.stylesService.getStringColor(this.color);
    const stringBase = this.thickness == 'thin' ? 1 : 2;
    this.stylesService.setStyle(this.string, 'height', `${stringBase * this.stringNumber}px`);
  }

  getRange(num:number) {
    return new Array(num);
  }
}
