import { ElementRef, Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BACKGROUND_STYLES, FRET_STYLES, NECK_STYLES, NUT_STYLES, PageStyleListObject, STRING_STYLES, StyleObject } from '../../definitions/styles.definitions';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { noteModel, noteStyle } from '../../models/note-model';

@Injectable({
  providedIn: 'root'
})
export class StylesService {
  styleList:PageStyleListObject;
  renderer: Renderer2;
  backgroundStyleChanges:Subject<string> = new Subject<string>;
  nutStyleChanges:Subject<string> = new Subject<string>;
  fretStyleChanges:Subject<string> = new Subject<string>;
  neckStyleChanges:Subject<string> = new Subject<string>;
  stringStyleChanges:Subject<string> = new Subject<string>;
  noteStyleChanges:Subject<noteStyle> = new Subject<noteStyle>;

  constructor(rendererFactory: RendererFactory2) {
    this.styleList = {
      background: BACKGROUND_STYLES,
      nut: NUT_STYLES,
      fret: FRET_STYLES,
      neck:NECK_STYLES,
      string:STRING_STYLES
    };
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  getStyleObjectByName(name:string, list:StyleObject[]){
    return list.find(e=> e.name == name);
  }

  getAvailableStyleListByType(type: keyof PageStyleListObject): StyleObject[] {
    if (type in this.styleList) {
      return this.styleList[type];
    }
    return [];
  }

  getStyleByNameAndProp(name: string, prop: keyof PageStyleListObject): string {
    const styles = this.getAvailableStyleListByType(prop);
    // getStyleObjectByName retornará undefined se 'styles' estiver vazio,
    // o que é tratado pela verificação if (styleObj).
    const styleObj = this.getStyleObjectByName(name, styles);
      if (styleObj) {
        return styleObj.style;
      }
    return '';
  }

  getNeckColor(name:string){
    const styleObj = this.styleList.neck.find(e=> e.name == name);
    if (styleObj) {
      this.neckStyleChanges.next(styleObj.style);
    }
  }

  getBackgroundColor(name:string){
    const styleObj = this.styleList.background.find(e=> e.name == name);
    if (styleObj) {
      this.backgroundStyleChanges.next(styleObj.style);
    }
  }

  getNutColor(name:string){
    const styleObj = this.styleList.nut.find(e=> e.name == name);
    if (styleObj) {
      this.nutStyleChanges.next(styleObj.style);
    }
  }

  getFretColor(name:string){
    const styleObj = this.styleList.fret.find(e=> e.name == name);
    if (styleObj) {
      this.fretStyleChanges.next(styleObj.style);
    }
  }

  getStringColor(name:string){
    const styleObj = this.styleList.string.find(e=> e.name == name);
    if (styleObj) {
      this.stringStyleChanges.next(styleObj.style);
    }
  }

  sendNoteStyleChange(style:noteStyle){
    style.note.textColor = style.textColor;
    this.noteStyleChanges.next(style);
  }

  setStyle(element: ElementRef, style: string, value: string): void {
    this.renderer.setStyle(element.nativeElement, style, value);
  }
}
