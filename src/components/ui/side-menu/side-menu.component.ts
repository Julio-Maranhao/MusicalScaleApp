import { Component } from '@angular/core';
import { MENU_ITEMS, MenuItem } from '../../../definitions/side-menu-items.definitions';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  actionByOptionName:Record<string, ()=>void> = {
    option1: ()=>{},
    option2: ()=>{},
    option3: ()=>{}
  }
  options: MenuItem[] = MENU_ITEMS;
}
