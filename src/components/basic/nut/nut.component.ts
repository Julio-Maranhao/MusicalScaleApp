import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nut',
  standalone: true,
  imports: [],
  templateUrl: './nut.component.html',
  styleUrl: './nut.component.css'
})
export class NutComponent {
  @Input() color:'bone' | 'black' | 'brass' = 'black';
}
