import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { StylesService } from '../../../services/menu/styles.service';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [],
  templateUrl: './background.component.html',
  styleUrl: './background.component.css'
})
export class BackgroundComponent {
  @Input() backgroundColor:string = 'white';
  @ViewChild('background') bg!:ElementRef;

  constructor(private stylesService:StylesService){}

  ngAfterViewInit(){
    this.stylesService.backgroundStyleChanges.subscribe((val)=>{
      this.stylesService.setStyle(this.bg, 'background', val)
    })
    this.stylesService.getBackgroundColor(this.backgroundColor);
  }
}
