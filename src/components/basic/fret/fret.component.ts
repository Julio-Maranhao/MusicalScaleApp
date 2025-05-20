import { Component, Input, signal } from '@angular/core';

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
  fretSpaceBase = 1.5;
  maxFrets = 24;
  marginLeft = signal('');

  ngOnInit(){
    const leftMargin = 34 + this.fretSpaceBase * (this.maxFrets - this.fretNumber);
    this.marginLeft.set(`margin-left:${leftMargin}px;`);
  }
}
