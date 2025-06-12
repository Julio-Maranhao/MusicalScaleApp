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
  @Input() fretNumber!:number;
  @Input() numberPosition:'top'|'bottom' = 'top';
  @Input() numberShow:'hover'|'always'|'never' = 'hover';
  @ViewChild('fret') fret!:ElementRef;

  constructor(private stylesService: StylesService){}

  ngAfterViewInit(){
    this.stylesService.fretStyleChanges.subscribe((val)=>{
      this.stylesService.setStyle(this.fret, 'background', val)
    })
    this.stylesService.getFretColor(this.color);
  }
}
