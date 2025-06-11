import { Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { MenuService } from '../../../services/menu/menu.service';
import { MenuOptionObject } from '../../../models/other-model';
import { Subscription } from 'rxjs';
import { NoteComponent } from '../../basic/note/note.component';
import { NgComponentOutlet } from '@angular/common';
import { noteModel, noteStyle } from '../../../models/note-model';
import { StylesService } from '../../../services/menu/styles.service';
import { ID_PARA_NOTA_PADRAO } from '../../../definitions/acordes.definitions';
import { DraggableHostDirective } from '../../../directives/draggable-host.directive';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [DraggableHostDirective],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.css'
})
export class ContextMenuComponent {
  @ViewChild('menu') menu!:ElementRef;
  @ViewChild('noteRef') noteRef!:ElementRef;
  @ViewChild(DraggableHostDirective, { static: false })
  draggableHost?: DraggableHostDirective;
  note:noteModel | undefined;
  behavior!: 'all' | 'single';
  textAutoColor:boolean = false;
  isFixed = false;
  private styleBase!:noteStyle;
  private subscription:Subscription | undefined;
  private isSelecting = false;

  constructor(
    private menuService: MenuService,
    private stylesService: StylesService
  ) {
    menuService.onNoteMenuChanges.subscribe({
      next: (noteComponent: NoteComponent) => {
        if (this.menu) {
          this.note = noteComponent.note;
          this.behavior = noteComponent.behavior;
          this.menu.nativeElement.style.display = 'block';
          this.stylesService.setStyle(this.noteRef, 'background-color', noteComponent.note.noteColor);
          const txColor = Object.keys(this.note).includes('textColor')? this.note.textColor : noteComponent.noteRef.nativeElement.style.color;
          this.stylesService.setStyle(this.noteRef, 'color', txColor);
          this.styleBase = {
            note:noteComponent.note,
            mode:noteComponent.behavior
          }
        }
      }
    });
    menuService.onMenuPositionChanges.subscribe({
      next: (event) => {
        if (this.menu && !this.isFixed) {
          this.draggableHost?.moveToViewportCenter();
        }
      }
    })
  }

  ngOnInit(){}

  //Funcionalidades
  changeNoteColor(event:Event){
    const color = (event.target as HTMLInputElement).value || '#000000';
    this.styleBase.note.noteColor = color;
    this.stylesService.setStyle(this.noteRef, 'background-color', color);
    // this.stylesService.sendNoteStyleChange(style);
  }

  endSelection(){setTimeout(()=>{this.isSelecting = false},100)}
  startSelection(){this.isSelecting = true}

  changeTextColor(event:Event){
    const color = (event.target as HTMLInputElement).value || '#ffffff';
    this.styleBase.note.textColor = color;
    this.stylesService.setStyle(this.noteRef, 'color', color);
    // this.stylesService.sendNoteStyleChange(style);
  }

  toggleTextAutoColor(event:boolean){
    this.textAutoColor = event;
  }

  applyAll(){
    const newStyle = {...this.styleBase};
    newStyle.mode = 'all';
    this.stylesService.sendNoteStyleChange(newStyle);
    this.isSelecting = false;
  }

  apply(){
    const newStyle = {...this.styleBase};
    newStyle.mode = 'single';
    this.stylesService.sendNoteStyleChange(newStyle);
    this.isSelecting = false;
  }

  reset(){
    this.styleBase.note.noteColor = '#000000';
    this.styleBase.note.textColor = '#ffffff';
    this.styleBase.mode = 'single';
    this.styleBase.note.visibility = true;
    this.stylesService.setStyle(this.noteRef, 'background-color', 'black');
    this.stylesService.setStyle(this.noteRef, 'color', 'white');
    this.stylesService.setStyle(this.noteRef, 'opacity', '1');
  }

  cancel(){
    this.menu.nativeElement.style.display = 'none';
    this.isSelecting = false;
  }

  // Funções de estado e UI
  toggleFixed(){this.isFixed = !this.isFixed;}
  getNoteName(){if(!this.note){return ''};return ID_PARA_NOTA_PADRAO[this.note!.noteId];}

  // Fecha quando clica fora
  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event) {
    if (this.isSelecting){return};
    if (this.menu && !this.menu.nativeElement.contains(event.target)) {
      this.menu.nativeElement.style.display = 'none';
    }
  }

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
