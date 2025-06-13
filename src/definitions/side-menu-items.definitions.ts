export interface MenuItem {
  name:string;
  icon:string;
  height:number;
  width:number;
  section:number;
  action?: ()=>void;
}

export const MENU_ITEMS:MenuItem[] =[
  {
    name: "Chords",
    icon: "ui/nota-musical.png",
    height: 30,
    width: 30,
    section: 0
  },
  {
    name: "Scales",
    icon: "ui/notas-musicais.png",
    height: 30,
    width: 30,
    section: 0
  },
  {
    name: "Instrument",
    icon: "ui/guitarras.svg",
    height: 24,
    width: 24,
    section: 1
  },
  {
    name: "Zoom +",
    icon: "ui/mais-zoom.svg",
    height: 24,
    width: 24,
    section: 2
  },
  {
    name: "Zoom -",
    icon: "ui/reduzir-o-zoom.svg",
    height: 24,
    width: 24,
    section: 2
  },
  {
    name: "Configurações",
    icon: "ui/deslizantes.svg",
    height: 24,
    width: 24,
    section: 3
  },
]
