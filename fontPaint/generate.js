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
    for (let i = 0; i <= lines; i++) {
      let paths = pathWhole[lines[i]];
      const currentLineTransform = pathPartsTransform[i];
      paths.forEach((path, index) => {
        let pathString = path.toSVG(6);
        const pathTransform = currentLineTransform[index];
        if (pathTransform) {
          pathString = `${pathString.slice(
            0,
            5
          )} transform="${pathTransform}" ${pathString.slice(5)}`;
        }
        const alignTransform = pathPartsAlignTransform[index];
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
  } else {
    pathWhole.forEach((path, index) => {
      const pathString = path.toSVG(6);
      const alignTransform = pathPartsAlignTransform[index];
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
      `${position.x1} ${position.y1} ${position.x1 + domBoxSize.width} ${
        position.y1 + domBoxSize.height
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
