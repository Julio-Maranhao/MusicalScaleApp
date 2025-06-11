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
  @ViewChild('string') string!:ElementRef;

  constructor(private stylesService:StylesService){}

  ngAfterViewInit(){
    this.stylesService.stringStyleChanges.subscribe(val => {
      this.stylesService.setStyle(this.string, 'background', val);
    });
    this.stylesService.getStringColor(this.color);
    const stringBase = this.thickness == 'thin' ? 1 : 2;
    this.stylesService.setStyle(this.string, 'height', `${stringBase * this.stringNumber}px`);
  }

}
