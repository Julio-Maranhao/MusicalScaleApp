export interface PageStyleListObject {
  nut:StyleObject[];
  fret:StyleObject[];
  string:StyleObject[];
  neck:StyleObject[];
  background:StyleObject[];
}

export interface StyleObject {
  style:string;
  name:string;
}

// Nut Styles
export const NUT_STYLES:StyleObject[] = [
  {name:'bone', style:'background-color: #D6D3C7;'},
  {name:'black', style:'background-color: #000000;'},
  {name:'brass', style:'background-color: #D7B563;'},
  {name:'white', style:'background-color: #ffffff;'},
  {name:'black', style:'background-color: #000000;'},
]

// Fret Styles
export const FRET_STYLES:StyleObject[] = [
  {name:'black', style:'#000000'},
  {name:'gray', style:'background: linear-gradient(90deg,rgba(84, 84, 84, 1) 0%, rgba(128, 128, 128, 1) 50%, rgba(84, 84, 84, 1) 100%);'},
  {name:'inox', style:'background: linear-gradient(90deg,rgba(133, 133, 133, 1) 0%, rgba(204, 204, 204, 1) 50%, rgba(133, 133, 133, 1) 100%);'},
  {name:'gold', style:'background: linear-gradient(90deg,rgba(168, 155, 59, 1) 0%, rgba(240, 221, 96, 1) 50%, rgba(168, 155, 59, 1) 100%);'},
]

// Strings Style
export const STRING_STYLES:StyleObject[] = [
  {name:'strings', style:'background: linear-gradient(0deg,rgba(84, 84, 84, 1) 0%, rgba(128, 128, 128, 1) 50%, rgba(84, 84, 84, 1) 100%);'},
]

// Neck Style
export const NECK_STYLES:StyleObject[] = [
  {name:'blonde', style:'background-color: #BBA79C;'},
  {name:'brown', style:'background-color: #54302E;'},
  {name:'ebony', style:'background-color: #333031;'},
  {name:'mapple', style:'background-color: #ECCEA4;'},
  {name:'purple', style:'background-color: #7A354A;'},
  {name:'white', style:'background-color: #ffffff;'},
]

// Background
export const BACKGROUND_STYLES:StyleObject[] = [
  {name:'grad-blue', style:'background: linear-gradient(to right, #2193b0, #6dd5ed);'},
  {name:'grad-gray', style:'background: linear-gradient(to right, #bdc3c7, #2c3e50);'},
  {name:'lawrencium', style:'background: linear-gradient(to right, #0f0c29, #302b63, #24243e);'},
]
