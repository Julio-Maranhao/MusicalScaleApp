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

  ngAfterViewInit(){
    console.log(this.neck);
    this.neck.nativeElement.style.width = `${16 + 48*this.instrument.fretNumber + 8}px`;
  }

  getRange(num:number){
    return new Array(num);
  }

}
