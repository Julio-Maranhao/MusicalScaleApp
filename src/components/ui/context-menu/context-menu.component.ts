import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { MenuService } from '../../../services/menu/menu.service';
import { MenuOptionObject } from '../../../models/other-model';
import { Subscription } from 'rxjs';
import { NoteComponent } from '../../basic/note/note.component';
import { NgComponentOutlet } from '@angular/common';
import { noteModel } from '../../../models/note-model';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.css'
})
export class ContextMenuComponent {
  @ViewChild('menu') menu!:ElementRef;
  note:noteModel | undefined;
  behavior!: 'all' | 'single';
  private subscription:Subscription | undefined;
  private isDragging = false;
  private isFixed = true;
  private offsetX = 0;
  private offsetY = 0;

  constructor(private menuService: MenuService) {
    menuService.onNoteMenuChanges.subscribe({
      next: (noteComponent: NoteComponent) => {
        if (this.menu) {
          this.note = noteComponent.note;
          this.behavior = noteComponent.behavior;
          this.menu.nativeElement.style.display = 'block';
        }
      }
    });
    menuService.onMenuPositionChanges.subscribe({
      next: (event) => {
        if (this.menu && !this.isFixed) {
          this.menu.nativeElement.style.left = window.innerWidth/2 - this.menu.nativeElement.offsetWidth/2 + 'px';
          this.menu.nativeElement.style.top = window.innerHeight/2 - this.menu.nativeElement.offsetHeight/2 + 'px';
        }
      }
    })
  }

  toggleFixed(){
    this.isFixed = !this.isFixed;
  }

  ngOnInit(){
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event) {
    if (this.menu && !this.menu.nativeElement.contains(event.target)) {
      this.menu.nativeElement.style.display = 'none';
    }
  }

   @HostListener('mousedown', ['$event'])
  onHostMouseDown(event: MouseEvent) {
    // Verifica se o elemento do menu existe, está visível e o clique foi dentro dele
    if (
      this.menu &&
      this.menu.nativeElement &&
      this.menu.nativeElement.style.display === 'block' &&
      this.menu.nativeElement.contains(event.target as Node)
    ) {
      event.preventDefault(); // Previne seleção de texto ou outros comportamentos padrão

      this.isDragging = true;

      // Calcula o deslocamento do clique do mouse em relação ao canto superior esquerdo do menu
      const menuRect = this.menu.nativeElement.getBoundingClientRect();
      this.offsetX = event.clientX - menuRect.left;
      this.offsetY = event.clientY - menuRect.top;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onDocumentMouseMove(event: MouseEvent) {
    if (this.isDragging && this.menu && this.menu.nativeElement) {
      event.preventDefault(); // Previne seleção de texto durante o arraste

      const newLeft = event.clientX - this.offsetX;
      const newTop = event.clientY - this.offsetY;

      this.menu.nativeElement.style.left = `${newLeft}px`;
      this.menu.nativeElement.style.top = `${newTop}px`;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onDocumentMouseUp(event: MouseEvent) {
    if (this.isDragging) {
      this.isDragging = false;
    }
  }

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
