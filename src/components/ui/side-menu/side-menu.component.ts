import { Component } from '@angular/core';
import { MENU_ITEMS, MenuItem } from '../../../definitions/side-menu-items.definitions';
import { StylesService } from '../../../services/menu/styles.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  actionByOptionName:Record<string, ()=>void> = {
    Chords: ()=>{},
    Scales: ()=>{},
    Instrument: ()=>{},
    "Zoom +": ()=>{this.onZoomPlus()},
    "Zoom -": ()=>{this.onZoomMinus()},
    Configurações: ()=>{}
  }
  options: MenuItem[] = MENU_ITEMS;

  constructor(private styleService: StylesService){
    for (const option of this.options) {
      if (!option.action) {
        option.action= this.actionByOptionName[option.name];
      }
    }
  }

  onZoomPlus(){
    console.log("Zoom +");
  }

  onZoomMinus(){
    console.log("Zoom -");
  }

}
