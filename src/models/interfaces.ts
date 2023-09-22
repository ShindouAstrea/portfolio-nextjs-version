export type Aplication = {
  name: string,
  id: string,
  imgSrc: string,
  tags: Array<string>,
  description: string,
  github: string
}
export type ContextMenuProps = {
  xPos: number;
  yPos: number;
  closeMenu: () => void;
}
export type apiResponse = {
  success: string;
  apps: Array<Object>;
}
export type Job = {
  id: string,
  title: string
  start: string
  end: string
  tags: Array<string>
  description: string,
  company: string
}
