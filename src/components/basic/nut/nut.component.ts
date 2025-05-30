import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { StylesService } from '../../../services/menu/styles.service';

@Component({
  selector: 'app-nut',
  standalone: true,
  imports: [],
  templateUrl: './nut.component.html',
  styleUrl: './nut.component.css'
})
export class NutComponent {
  @Input() color:string = 'black';
  @ViewChild('nut') nut!:ElementRef;

  constructor(private stylesService: StylesService){}

  ngAfterViewInit(){
    this.stylesService.nutStyleChanges.subscribe((val)=>{
      this.stylesService.setStyle(this.nut, 'background', val)
    })
    this.stylesService.getNutColor(this.color);
  }
}
