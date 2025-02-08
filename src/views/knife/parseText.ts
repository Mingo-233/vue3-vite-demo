// import opentype from "opentype.js";
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
      // const buffer = fetch("/Gilroy-Medium.otf").then((res) =>
      // const buffer = fetch("/Gilroy-Medium.otf").then((res) =>
      //   res.arrayBuffer()
      // );
      // buffer.then((data) => {
      //   const font = opentype.parse(data);
      //   const left = (fontInfo.style.left + config.bleedLineWidth) * config.DPI;
      //   const top = (fontInfo.style.top + config.bleedLineWidth) * config.DPI;
      //   const fontSize = fontInfo.style.fontSize * config.DPI;
      //   let path = font.getPath(fontInfo.value, 0, 0, fontSize, {});
      //   // 获取路径的边界框
      //   const bbox = path.getBoundingBox();
      //   const result = path.toSVG(6);
      //   const SVG = `
      // <svg xmlns="http://www.w3.org/2000/svg" viewBox="${bbox.x1} ${bbox.y1} ${
      //     bbox.x2 - bbox.x1
      //   } ${bbox.y2 - bbox.y1}"
      //   width="${bbox.x2 - bbox.x1}" height="${bbox.y2 - bbox.y1}"
      //   transform="translate(${left}, ${top})"
      //   >
      //     ${result}
      // </svg>
      // `;
      //   console.log(
      //     "bbox",
      //     bbox,
      //     `${bbox.x1} ${bbox.y1} ${bbox.x2 - bbox.x1} ${bbox.y2 - bbox.y1}`
      //   );
      //   resolve(SVG);
      // });
      // const buffer = fetch("/HarmonyOS.woff2").then((res) =>
      const buffer = fetch(fontInfo.src).then((res) =>
        // const buffer = fetch("/HarmonyOS_Regular.ttf").then((res) =>
        res.arrayBuffer()
      );
      buffer.then((data) => {
        const decompressed = window.Module.decompress(data);
        const font = window.opentype.parse(decompressed);
        // const font = window.opentype.parse(data);
        const left = (fontInfo.style.left + config.bleedLineWidth) * config.DPI;
        const top = (fontInfo.style.top + config.bleedLineWidth) * config.DPI;
        // const left = fontInfo.style.left + config.bleedLineWidth;
        // const top = fontInfo.style.top + config.bleedLineWidth;
        const fontSize = fontInfo.style.fontSize;
        const {
          pathParts: paths,
          pathPartsTransform,
          pathPartsAlignTransform,
          position,
          svgSize,
          lineHeight,
          isVertical,
          domBoxSize,
          hasCnChar,
        } = window.getTextPaths(font, {
          // text: "你好哇",
          text: fontInfo.value,
          fontSize: fontSize,
          textLineHeight: fontInfo.style.lineHeight,
          textAlign: fontInfo.style.textAlign,
          vertical: fontInfo.style.vertical,
          MaxWidth: fontInfo.style.width,
          MaxHeight: fontInfo.style.height,
        });

        const adobeAiTransform = `translate(${left}, ${top})`;
        const svgDom = window.genSvgCode(paths, {
          position,
          svgSize,
          lineHeight,
          isVertical,
          pathPartsTransform,
          pathPartsAlignTransform,
          domBoxSize,
          hasCnChar,
          adobeAiTransform,
          DPI: config.DPI,
        });

        resolve(svgDom);
      });
    });
  }
  return {
    getSvg,
  };
};
