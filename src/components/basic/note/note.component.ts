import { Component, Input } from '@angular/core';
import { noteModel } from '../../../models/note-model';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {
  @Input() size!:string;
  @Input() note!: noteModel;
}
