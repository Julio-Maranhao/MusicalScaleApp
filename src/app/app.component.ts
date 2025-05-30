import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../components/ui/header/header.component";
import { FooterComponent } from "../components/ui/footer/footer.component";
import { ContextMenuComponent } from "../components/ui/context-menu/context-menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ContextMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MusicalScaleApp';
}
