function genSvgCode(pathWhole, config) {
  const {
    position,
    isVertical,
    pathPartsTransform,
    pathPartsAlignTransform,
    domBoxSize,
    hasCnChar,
    adobeAiTransform = "",
    DPI = 1,
  } = config;
  let svgPathString = "";
  //   判断是个对象
  if (Object.prototype.toString.call(pathWhole) === "[object Object]") {
    console.log("paths", pathWhole, pathPartsTransform);
    const lines = Object.keys(pathWhole);

    for (let i = 0; i < lines.length; i++) {
      let paths = pathWhole[lines[i]];
      const currentLineTransform = pathPartsTransform[i];
      const currentAlignTransform = pathPartsAlignTransform[i];
      paths.forEach((path, index) => {
        if (!path) return;
        let pathString = path.toSVG(6);
        const pathTransform = currentLineTransform[index];
        if (pathTransform) {
          pathString = `${pathString.slice(
            0,
            5
          )} transform="${pathTransform}" ${pathString.slice(5)}`;
        }
        const alignTransform = currentAlignTransform[index];
        const template = `
                  <g transform="${alignTransform ? alignTransform : ""}">
                      ${pathString}
                  </g>
                  `;
        svgPathString += template;
      });
    }
  }

  const svgDom = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let G_Template = "";
  svgDom.setAttribute("id", "preview");
  //   中英文都存在垂直情况
  if (isVertical && hasCnChar) {
    svgDom.setAttribute("width", domBoxSize.width + "mm");
    svgDom.setAttribute("height", domBoxSize.height + "mm");
    svgDom.setAttribute(
      "viewBox",
      `${position.x1} ${position.y1} ${position.x2 + domBoxSize.width} ${
        position.y2 + domBoxSize.height
      }`
    );
    svgDom.setAttribute("transform", `${adobeAiTransform}`);

    G_Template = `
      <g >
      ${svgPathString}
      </g>
      `;
    svgDom.innerHTML = G_Template;
  } else if (isVertical) {
    let originWidth = domBoxSize.width;
    let originHeight = domBoxSize.height;
    svgDom.setAttribute("width", domBoxSize.height + "mm");
    svgDom.setAttribute("height", domBoxSize.width + "mm");
    // svgDom.setAttribute(
    //   "viewBox",
    //   `${position.x1} ${position.y1} ${position.x1 + originHeight} ${
    //     position.y1 + originWidth
    //   }`
    // );
    svgDom.setAttribute(
      "viewBox",
      `${position.x1} ${position.y1}  ${originHeight} ${originWidth}`
    );
    const svgTranslateX = (domBoxSize.height - domBoxSize.width) / 2;
    // svgDom.setAttribute(
    //   "transform",
    //   `${adobeAiTransform}
    //           `
    // );
    // svgDom.setAttribute(
    //   "transform",
    //   `
    //   rotate(45)
    //   translate(0,-${domBoxSize.width * DPI})
    //         `
    // );
    // 在Ai中
    svgDom.setAttribute(
      "transform",
      `${adobeAiTransform}  rotate(90)
        translate(0,-${domBoxSize.width * DPI})
              `
    );

    const G_Transform = ``;
    G_Template = `
      <g ${G_Transform}>
      ${svgPathString}
      </g>
      `;
    svgDom.innerHTML = G_Template;
  } else {
    // 水平情况
    svgDom.setAttribute("width", domBoxSize.width + "mm");
    svgDom.setAttribute("height", domBoxSize.height + "mm");
    svgDom.setAttribute(
      "viewBox",
      `${position.x1} ${position.y1} ${position.x2 + domBoxSize.width} ${
        position.y2 + domBoxSize.height
      }`
    );
    svgDom.setAttribute("transform", `${adobeAiTransform}`);
    const G_Transform = ``;
    G_Template = `
      <g ${G_Transform}>
      ${svgPathString}
      </g>
      `;
    svgDom.innerHTML = G_Template;
  }

  //   svgDom.setAttribute("overflow", "visible");

  svgDom.setAttribute("fill", "red");

  svgDom.innerHTML = G_Template;
  return svgDom;
}
