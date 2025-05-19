import { Component } from '@angular/core';
import { BackgroundComponent } from "../../components/basic/background/background.component";
import { FretboardComponent } from "../../components/basic/fretboard/fretboard.component";
import { MappingService } from '../../services/mapping.service';
import { musicalInstrumentModel } from '../../models/instrument-model';
import { noteModel } from '../../models/note-model';

@Component({
  selector: 'app-application-page',
  standalone: true,
  imports: [BackgroundComponent, FretboardComponent],
  templateUrl: './application-page.component.html',
  styleUrl: './application-page.component.css'
})
export class ApplicationPageComponent {
  instrument!: musicalInstrumentModel;
  notes!: noteModel[];
  hasInstument:boolean = false;

  constructor(private mappingService:MappingService){
    mappingService.onInstrumentChange.subscribe((newInstrument)=>{
      this.instrument = newInstrument;
      this.hasInstument = true;
    });
    mappingService.onNotesChange.subscribe((notes)=>{
      this.notes = notes;
      this.hasInstument = true;
    });
    mappingService.gerarGuitarraPadrao();
  }
}
