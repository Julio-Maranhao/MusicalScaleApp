import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fret',
  standalone: true,
  imports: [],
  templateUrl: './fret.component.html',
  styleUrl: './fret.component.css'
})
export class FretComponent {
  @Input() color:'gray' | 'inox' | 'gold' = 'gray';
  @Input() noteSize:'small' | 'medium' | 'large'= 'small';
  @Input() fretNumber!:number;
}
