export interface MenuItem {
  name:string;
  icon:string;
  section:number;
  action?: ()=>void;
}

export const MENU_ITEMS:MenuItem[] =[
  {
    name: "Chords",
    icon: "../../public/ui/procurar.svg",
    section: 0
  },
  {
    name: "Scales",
    icon: "../../public/ui/procurar.svg",
    section: 0
  },
  {
    name: "Zoom +",
    icon: "../../public/ui/procurar.svg",
    section: 0
  },
  {
    name: "Zoom -",
    icon: "../../public/ui/procurar.svg",
    section: 0
  },
]
