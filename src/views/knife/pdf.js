import SVGtoPDF from "svg-to-pdfkit";
const layerKnifeTotalX = 378;
const layerKnifeTotalY = 311;
export const usePdf = (config) => {
  const { bleedConfig, cutConfig, holesConfig, foldsConfig } = config;
  console.log("usePdf", config);
  function painting(doc) {
    // 添加内容到PDF
    // doc.text("Hello, world!");
    drawCut(doc, cutConfig);
    drawHoles(doc, holesConfig);
    drawFolds(doc, foldsConfig);
    drawBleed(doc, bleedConfig);
  }
  function drawBleed(doc, config) {
    const { path, strokeColor, strokeWidth, translate } = config;
    doc
      .translate(translate.x, translate.y)
      .path(path)
      .strokeColor(strokeColor)
      .lineWidth(strokeWidth)
      .stroke();
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

    const translateX = (pageWidth - layerKnifeTotalX) / 2;
    const translateY = (pageHeight - layerKnifeTotalY) / 2;
    doc.translate(translateX, translateY);
  }
  function drawEndBefore(doc) {
    const svg1 = `<svg
  x="0"
  y="0"
  width="10mm"
  height="10mm"
  overflow="visible"
  viewBox="0 0 1 1"
>
  <circle cx="0.5" cy="0.5" r="0.4" fill="red" />
</svg>
`;
    doc.addSVG(svg1, 0, 0, {
      width: 100,
      height: 100,
    });
  }
  function drawEnd(doc) {
    doc.end();
  }
  function genPdf() {
    const doc = new PDFDocument();
    console.log("doc", doc);

    // 将其保存到 Blob 中
    const stream = doc.pipe(blobStream());

    PDFDocument.prototype.addSVG = function (svg, x, y, options) {
      return SVGtoPDF(this, svg, x, y, options), this;
    };
    drawStartBefore(doc);

    painting(doc);
    drawEndBefore(doc);
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
