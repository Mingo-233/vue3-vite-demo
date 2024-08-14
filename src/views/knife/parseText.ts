import opentype from "opentype.js";
export const useOpenType = () => {
  async function getSvg(
    fontInfo: any,
    config: {
      DPI: number;
      marginTop: number;
      marginLeft: number;
      bleedLineWidth: number;
    }
  ) {
    return new Promise((resolve, reject) => {
      const buffer = fetch("/Gilroy-Medium.otf").then((res) =>
        res.arrayBuffer()
      );
      buffer.then((data) => {
        const font = opentype.parse(data);
        // let path = font.getPath("Your text here", 0, 0, 50, {});
        const left = (fontInfo.style.left + config.bleedLineWidth) * config.DPI;
        const top = (fontInfo.style.top + config.bleedLineWidth) * config.DPI;
        const fontSize = fontInfo.style.fontSize * config.DPI;
        console.log("left", left);

        let path = font.getPath("Your text here", 0, 0, fontSize, {});
        console.log(path);
        // 获取路径的边界框
        const bbox = path.getBoundingBox();
        const result = path.toSVG(6);
        const SVG = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="${bbox.x1} ${bbox.y1} ${
          bbox.x2 - bbox.x1
        } ${bbox.y2 - bbox.y1}"
        width="${bbox.x2 - bbox.x1}" height="${bbox.y2 - bbox.y1}"
        transform="translate(${left}, ${top})"
        >
          ${result}
      </svg>
      `;

        console.log(
          "bbox",
          bbox,
          `${bbox.x1} ${bbox.y1} ${bbox.x2 - bbox.x1} ${bbox.y2 - bbox.y1}`
        );
        resolve(SVG);
      });
    });
  }
  return {
    getSvg,
  };
};
