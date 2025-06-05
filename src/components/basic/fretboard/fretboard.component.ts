import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
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
  fretSpaceBase = 1.5;
  maxFrets = 24;

  constructor(private styleService:StylesService){}

  ngAfterViewInit(){
    this.styleService.neckStyleChanges.subscribe((val)=>{
      this.styleService.setStyle(this.neck, 'background', val);
    });
    this.styleService.getNeckColor(this.color);

    let totalSize = 16 + 8;
    for (let index = 0; index < this.instrument.fretNumber; index++) {
      totalSize += 40 + this.fretSpaceBase * (this.maxFrets - (index+1)) + 4 + 0.5;
    }
    this.styleService.setStyle(this.neck, 'width', `${totalSize}px`);
  }

  getRange(num:number){
    return new Array(num);
  }

}
