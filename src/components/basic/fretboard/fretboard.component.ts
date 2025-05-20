import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { musicalInstrumentModel } from '../../../models/instrument-model';
import { StringComponent } from "../string/string.component";
import { NutComponent } from "../nut/nut.component";
import { FretComponent } from "../fret/fret.component";
import { MappingService } from '../../../services/mapping.service';
import { noteModel } from '../../../models/note-model';

@Component({
  selector: 'app-fretboard',
  standalone: true,
  imports: [StringComponent, NutComponent, FretComponent],
  templateUrl: './fretboard.component.html',
  styleUrl: './fretboard.component.css'
})
export class FretboardComponent {
  @Input() color:'white' | 'brown' | 'ebony' | 'mapple' | 'purple' = 'mapple';
  @Input() instrument!: musicalInstrumentModel;
  @Input() notes!: noteModel[];
  @ViewChild('fretboard') neck!: ElementRef;
  fretSpaceBase = 1.5;
  maxFrets = 24;

  ngAfterViewInit(){
    let totalSize = 16 + 8;
    for (let index = 0; index < this.instrument.fretNumber; index++) {
      totalSize += 34 + this.fretSpaceBase * (this.maxFrets - index) + 4;
    }
    this.neck.nativeElement.style.width = `${totalSize}px`;
  }

  getRange(num:number){
    return new Array(num);
  }

}
