import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScaleService {

  constructor() { }


  convertNumToNote(num:number):number[]{
    const octave = Math.floor(num/12);
    const note = num%12;

    return [octave, note]
  }

  convertNoteToNum(octave:number, note:number):number {
    return (octave * 12) + note
  }
}
