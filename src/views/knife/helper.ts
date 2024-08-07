export interface Sketch {
  totalX: number;
  totalY: number;
  bleedline: number | string;
  bleeds: SvgOpt[];
  cuts: SvgOpt[];
  faces: Face[];
  folds: SvgOpt[];
  holes: SvgOpt[][];
  transform?: any;
  sizeArrowData: any[];
  size: { W: number; H: number; L: number };
  knifeSize: { W: number; H: number; L: number };
  outSize: { W: number; H: number; L: number };
  thickness: number;
  positionX?: number;
  positionY?: number;
}
export interface Design {
  type: string;
  uuid: string;
  id: string;
  shapeType?: string;
  can_set_color?: number;
  fills?: { class: string; color: string; value: string; type: string }[];
  owidth?: number;
  oheight?: number;
  locked?: boolean;
  isProportional?: boolean;
  style: {
    vertical?: number;
    left: number;
    top: number;
    width: number;
    height: number;
    fontSize?: number;
    rotate: number;
    rotateX?: number;
    rotateY?: number;
    opacity: number;
    transform?: string;
    color?: string;
    fontFamily?: string;
    fontStyle?: string;
    fontWeight?: string;
    lineHeight?: number;
    textAlign?: string;
    textDecoration?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeWidthTemp?: number;
    strokeDashArray?: number;
    strokeDashOffset?: number;
    radius?: number;
  };
  value?: string;
  example?: string;
  bg?: any;
  src?: string;
  _layer_name?: string;
  _selected?: boolean;
  designs?: Design[];
  _is_texture?: boolean;
}

export interface SvgOpt {
  mtd: string;
  x: number;
  y: number;
  rx?: number;
  ry?: number;
  cx?: number;
  cy?: number;
  ang?: number;
  arc?: number;
  dir?: number;
  path?: any;
  [key: string]: any;
}
export interface Face {
  dlist: SvgOpt[];
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
  holes?: SvgOpt[][] | null;
}

export const DPI = 3.7795275591;
export type TUnitType = "mm" | "in" | undefined;
