import { Injectable } from '@angular/core';
import { BACKGROUND_STYLES, FRET_STYLES, NECK_STYLES, NUT_STYLES, PageStyleListObject, STRING_STYLES, StyleObject } from '../definitions/styles.definitions';

@Injectable({
  providedIn: 'root'
})
export class StylesService {
  styleList:PageStyleListObject;

  constructor() {
    this.styleList = {
      background: BACKGROUND_STYLES,
      nut: NUT_STYLES,
      fret: FRET_STYLES,
      neck:NECK_STYLES,
      string:STRING_STYLES
    };
  }

  getStyleObjectByName(name:string, list:StyleObject[]){
    return list.find(e=> e.name == name);
  }

  getAvailbleStyleListByType(name:string) {
    const styleList:StyleObject[] = [];
    for (const prop in styleList) {
      if (prop == name){
        styleList.concat(styleList[prop]);
      }
    }
    return styleList;
  }

  getStyleByNameAndProp(name:string, prop:string):StyleObject {
    const styleList = this.getAvailbleStyleListByType(prop);
    if (styleList) {
      const styleObj = this.getStyleObjectByName(name, styleList);
      if (styleObj) {
        return styleObj;
      }
    }
    return {name:'', style:''};
  }
}
