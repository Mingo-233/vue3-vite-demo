import SVGtoPDF from "svg-to-pdfkit";
import { layerKnifeData } from "./mockData";
import projectInfo from "../svg/info.json";
import { DPI } from "./helper";
import { useOpenType } from "./parseText";
const DPIV2 = 2.834645669291339;
const layerKnife = layerKnifeData;
const MARGIN_SIDE = 30;
const MARGIN = MARGIN_SIDE * 2;
// *DPIV2的目的是，将mm转换为pt
const sizeWidth =
  (layerKnife.totalX + 2 * layerKnife.bleedline + MARGIN) * DPIV2;
const sizeHeight =
  (layerKnife.totalY + 2 * layerKnife.bleedline + MARGIN) * DPIV2;
console.log("sizeWidth", sizeWidth, "sizeHeight", sizeHeight);

export const useSvgPdf = (config) => {
  const { bleedConfig, cutConfig, holesConfig, foldsConfig } = config;
  console.log("usePdf", config);
  const { getSvg } = useOpenType();
  function painting(doc) {
    // 添加内容到PDF
    // doc.text("Hello, world!");
    // drawCut(doc, cutConfig);
    // drawHoles(doc, holesConfig);
    // drawFolds(doc, foldsConfig);
    // drawBleed(doc, bleedConfig);
    // doc.fontSize(25).text("Here is some vector graphics...", 100, 80);
  }
  function drawBleed(doc, config) {
    const { path, strokeColor, strokeWidth, translate } = config;

    // doc
    //   .translate(translate.x, translate.y)
    //   .path(path)
    //   .strokeColor(strokeColor)
    //   .lineWidth(strokeWidth)
    //   .stroke();
  }
  function drawFolds(doc, config) {
    const { paths, strokeColor, strokeWidth, strokeDasharray } = config;
    paths.forEach((info) => {
      const { x1, y1, x2, y2 } = info;
      doc
        .strokeColor(strokeColor)
        .lineWidth(strokeWidth)
        .dash(strokeDasharray.length, { space: strokeDasharray.space })
        .moveTo(x1, y1)
        .lineTo(x2, y2)
        .stroke()
        .undash();
    });
  }
  function drawHoles(doc, config) {
    const { paths, strokeColor, strokeWidth, fill } = config;
    paths.forEach((path) => {
      doc.path(path).strokeColor(strokeColor).lineWidth(strokeWidth).stroke();
    });
  }
  function drawCut(doc, config) {
    const { path, strokeColor, strokeWidth } = config;
    doc.path(path).strokeColor(strokeColor).lineWidth(strokeWidth).stroke();
  }

  function drawStartBefore(doc) {
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    console.log("pageWidth", pageWidth, "pageHeight", pageHeight);
    const translateX = MARGIN_SIDE * DPIV2;
    const translateY = MARGIN_SIDE * DPIV2;
    doc.translate(translateX, translateY);
  }
  async function drawEndBefore(doc) {
    const globalSvg = document.querySelector("#globalSvg");
    console.log("globalSvg", globalSvg);
    // globalSvg.setAttribute("transform", "scale(1, 1)");
    doc.addSVG(globalSvg, 0, 0);

    const textSvg = await getSvg(projectInfo.design_data[0], {
      DPI: DPIV2,
      marginTop: 0,
      marginLeft: MARGIN_SIDE,
      bleedLineWidth: layerKnife.bleedline,
    });
    doc.addSVG(textSvg, 0, 0);
  }
  function drawEnd(doc) {
    doc.end();
    console.log(doc.page.xobjects);
  }
  async function genPdf() {
    const doc = new PDFDocument({
      size: [sizeWidth, sizeHeight],
    });
    console.log("doc", doc);
    // 将其保存到 Blob 中
    const stream = doc.pipe(blobStream());

    PDFDocument.prototype.addSVG = function (svg, x, y, options) {
      return SVGtoPDF(this, svg, x, y, options), this;
    };
    drawStartBefore(doc);

    painting(doc);
    await drawEndBefore(doc);
    drawEnd(doc);
    // 当Blob流结束时，生成下载链接
    stream.on("finish", function () {
      const url = stream.toBlobURL("application/pdf");
      preview(url);
      // download(url)
    });
  }
  window.genPdf = genPdf;

  return { genPdf };
};

function preview(url) {
  const dom = document.querySelector("#preview-app");
  dom.src = url;
}
function download(url) {
  const link = document.createElement("a");
  link.href = url;
  const hashName = Math.random().toString(36).substring(7);
  link.download = hashName + ".pdf";
  link.textContent = "Download PDF";
  document.body.appendChild(link);
  link.click();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
