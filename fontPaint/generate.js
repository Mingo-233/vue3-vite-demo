const isCN = true;

function genSvgCode(pathWhole, config) {
  const {
    position,
    svgSize,
    lineHeight,
    isVertical,
    pathPartsTransform,
    pathPartsAlignTransform,
    domBoxSize,
  } = config;
  let svgPathString = "";
  //   判断是个对象
  if (Object.prototype.toString.call(pathWhole) === "[object Object]") {
    console.log("paths", pathWhole, pathPartsTransform);
    const lines = Object.keys(pathWhole);
    console.log("lines[i]", lines);

    for (let i = 0; i < lines.length; i++) {
      let paths = pathWhole[lines[i]];
      const currentLineTransform = pathPartsTransform[i];
      const currentAlignTransform = pathPartsAlignTransform[i];
      console.log("currentLineTransform", currentLineTransform);
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
  } else {
    pathWhole.forEach((path, index) => {
      const pathString = path.toSVG(6);
      const alignTransform =
        pathPartsAlignTransform && pathPartsAlignTransform[index];
      const template = `
            <g transform="translate(0, ${lineHeight * index}) ${
        alignTransform ? alignTransform : ""
      }">
                ${pathString}
            </g>
            `;
      svgPathString += template;
    });
  }

  const svgDom = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgDom.setAttribute("id", "preview");
  // svgDom.setAttribute("width", domBoxSize.width);
  // svgDom.setAttribute("height", domBoxSize.height);
  svgDom.setAttribute(
    "width",
    isVertical && !isCN ? domBoxSize.height : domBoxSize.width
  );
  svgDom.setAttribute(
    "height",
    isVertical && !isCN ? domBoxSize.width : domBoxSize.height
  );
  svgDom.setAttribute("overflow", "visible");
  console.log("position", position);

  svgDom.setAttribute("fill", "red");
  if (isVertical && !isCN) {
    svgDom.setAttribute(
      "viewBox",
      `${position.x1} ${position.y1} ${position.x1 + domBoxSize.height} ${
        position.y1 + domBoxSize.width
      }`
    );
    console.log("isVertical", isVertical);
    svgDom.setAttribute(
      "transform",
      `rotate(90) 
        translate(${(domBoxSize.height - domBoxSize.width) / 2},${
        (domBoxSize.height - domBoxSize.width) / 2
      })
          `
    );
  } else {
    svgDom.setAttribute(
      "viewBox",
      `${position.x1} ${position.y1} ${position.x2 + domBoxSize.width} ${
        position.y2 + domBoxSize.height
      }`
    );
  }
  // const G_Transform = isVertical
  //   ? `transform="rotate(90, ${position.x1} ,${position.y1}) translate(0,0})"`
  //   : "";
  const G_Transform = ``;
  const G_Template = `
    <g ${G_Transform}>
    ${svgPathString}
    </g>
    `;
  svgDom.innerHTML = G_Template;
  return svgDom;
}
