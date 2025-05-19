import { Component, Input, signal } from '@angular/core';
import { noteModel } from '../../../models/note-model';
import { NoteComponent } from "../note/note.component";

@Component({
  selector: 'app-string',
  standalone: true,
  imports: [NoteComponent],
  templateUrl: './string.component.html',
  styleUrl: './string.component.css'
})
export class StringComponent {
  @Input() stringNumber!:number;
  @Input() thickness:'thin' | 'large' = 'thin';
  @Input() notes!: noteModel[];
  stringHeight = signal('');
  filteredNotes:noteModel[] = [];

  constructor(){}

  ngOnInit(){
    const stringBase = this.thickness == 'thin' ? 1 : 2;
    this.stringHeight.set(`height: ${stringBase * this.stringNumber}px`);
    if (this.notes && this.stringNumber) {
      this.filteredNotes = this.notes.filter(e => e.corda == this.stringNumber);
    }
  }
}
