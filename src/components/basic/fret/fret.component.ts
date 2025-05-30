import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { StylesService } from '../../../services/menu/styles.service';

@Component({
  selector: 'app-fret',
  standalone: true,
  imports: [],
  templateUrl: './fret.component.html',
  styleUrl: './fret.component.css'
})
export class FretComponent {
  @Input() color:string = 'gray';
  @Input() noteSize:string= 'small';
  @Input() fretNumber!:number;
  @ViewChild('fret') fret!:ElementRef;
  fretSpaceBase = 1.5;
  maxFrets = 24;
  marginLeft = signal('');

  constructor(private stylesService: StylesService){}

  ngAfterViewInit(){
    this.stylesService.fretStyleChanges.subscribe((val)=>{
      this.stylesService.setStyle(this.fret, 'background', val)
    })
    const leftMargin = 40 + this.fretSpaceBase * (this.maxFrets - (this.fretNumber+1));
    this.marginLeft.set(`margin-left:${leftMargin}px;`);
    this.stylesService.getFretColor(this.color);
  }
}
