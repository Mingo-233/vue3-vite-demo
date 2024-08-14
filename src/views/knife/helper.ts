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
export function colorEqual(c1: string, c2: string) {
  const c1Rgba = hexToRGB(c1);
  const c2Rgba = hexToRGB(c2);
  return (
    c1Rgba.r === c2Rgba.r &&
    c1Rgba.g === c2Rgba.g &&
    c1Rgba.b === c2Rgba.b &&
    c1Rgba.a === c2Rgba.a
  );
}
export function hexToRGB(val: string) {
  if (!val) return { r: 0, g: 0, b: 0, a: 0 };
  let color = val.toLowerCase().trim();
  const pattern = /^#([0-9|a-f]{3}|[0-9|a-f]{6}|[0-9|a-f]{4}|[0-9|a-f]{8})$/;
  const rgbPattern = /^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/;
  const rgbaPattern =
    /^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/;
  if (color && pattern.test(color)) {
    const isOp = color.length === 5 || color.length === 9;
    let op = 1;
    if (color.length === 5) {
      op = parseInt(`0x${color[4]}${color[4]}`) / 255;
      color = color.substr(0, color.length - 1);
    } else if (color.length === 9) {
      op = parseInt(`0x${color[7]}${color[8]}`) / 255;
      color = color.substr(0, color.length - 2);
    }
    if (color.length == 4) {
      // 将三位转换为六位
      color =
        "#" + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
    }
    //处理六位的颜色值
    const colorNew = [];
    for (let i = 1; i < 7; i += 2) {
      colorNew.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    return {
      r: colorNew[0],
      g: colorNew[1],
      b: colorNew[2],
      a: isOp ? op : 1,
    };
  } else if (rgbPattern.test(color)) {
    const matched = color.match(rgbPattern) as string[];
    return {
      r: Number(matched[1]) % 256,
      g: Number(matched[2]) % 256,
      b: Number(matched[3]) % 256,
      a: 1,
    };
  } else if (rgbaPattern.test(color)) {
    const matched = color.match(rgbaPattern) as string[];
    return {
      r: Number(matched[1]) % 256,
      g: Number(matched[2]) % 256,
      b: Number(matched[3]) % 256,
      a: Number(matched[4]),
    };
  }
  return { r: 0, g: 0, b: 0, a: 0 };
}