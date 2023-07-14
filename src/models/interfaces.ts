export type Aplication = {
    name:string,
    id:string,
    imgSrc:string,
    tags:Array<string>,
    description:string
  }
  export type  ContextMenuProps ={
    xPos: number;
    yPos: number;
    closeMenu:()=>void;
 }
 export type apiResponse ={
  success: string;
  apps: []
 }
