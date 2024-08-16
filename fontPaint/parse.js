function createWordPathContext() {
  const context = {
    word: "",
    pathParts: [],
    pathPartsAlignTransform: [],
    resetWord() {
      context.word = "";
    },
    addWord(text) {
      context.word += text;
    },
    backWord() {
      context.word = context.word.slice(0, -1);
    },
    addPath(path) {
      context.pathParts.push(path);
    },
    addTransform(transform) {
      console.log("addTransform", transform);
      context.pathPartsAlignTransform.push(transform);
    },
  };

  return context;
}
function createCnWordPathContext() {
  const context = {
    word: "",
    line: 0, //层数
    pathParts: {
      0: [],
    },
    pathPartsTransform: {
      0: [],
    },
    pathPartsAlignTransform: [],
    resetWord() {
      context.word = "";
    },
    addWord(text) {
      context.word += text;
    },
    addPath(path) {
      context.pathParts[context.line].push(path);
    },
    nextLine(line) {
      context.line = line;
      pathParts[line] = [];
    },
    addTransform(transform) {
      context.pathPartsTransform[context.line].push(transform);
    },
    addAlignTransform(transform) {
      context.pathPartsAlignTransform.push(transform);
    },
  };
  return context;
}
function getPath(fontApp, text, fontSize) {
  return fontApp.getPath(text, 0, 0, fontSize);
}
function getTextPaths(fontApp, config) {
  const textArr = config.text.split("");
  console.log(textArr);
  const context = createWordPathContext();
  const position = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  };
  const svgSize = {
    width: 0,
    height: 0,
  };
  let lineHeight = 0;
  const isVertical = !!config.vertical;
  //   编辑器中的选框大小
  const MAX_WIDTH = isVertical ? config.MaxHeight : config.MaxWidth;
  const MAX_HIGHT = isVertical ? config.MaxWidth : config.MaxHeight;
  for (let i = 0; i < textArr.length; i++) {
    const text = textArr[i];
    if (text === "\n") {
      console.log("需要换行");
      settlePath(context);
      // 跳过 换行字符的处理
      i++;
      continue;
    }
    context.addWord(text);
    const path = getPath(fontApp, context.word, config.fontSize);
    const pathBoundingBox = path.getBoundingBox();
    if (i === 0) {
      position.x1 = pathBoundingBox.x1;
      position.y1 = pathBoundingBox.y1;
    }
    const currentWidth = pathBoundingBox.x2 - pathBoundingBox.x1;
    if (currentWidth > svgSize.width) {
      svgSize.width = currentWidth;
    }
    const currentHeight = pathBoundingBox.y2 - pathBoundingBox.y1;
    if (currentHeight > svgSize.height) {
      svgSize.height = currentHeight;
      lineHeight = currentHeight;
    }
    // 超出选框边界
    if (pathBoundingBox.x2 > MAX_WIDTH) {
      console.log("需要换行", text, context);
      context.backWord();
      settlePath(context);
      context.addWord(text);
    }
    //   end 最后一个字符
    if (i === textArr.length - 1) {
      settlePath(context, false);
    }
  }
  //   结算当前路径
  function settlePath(context, isBreak = true) {
    const path = getPath(fontApp, context.word, config.fontSize);
    const pathBoundingBox = path.getBoundingBox();
    const transform = computedAlignTransform(
      config.textAlign,
      MAX_WIDTH,
      MAX_HIGHT,
      pathBoundingBox
    );
    context.addPath(path);
    context.addTransform(transform);
    context.resetWord();
    if (isBreak) {
      let currentHeight = position.y2 - position.y1;
      svgSize.height = svgSize.height + currentHeight;
    }
  }
  function computedAlignTransform(textAlign, width, height, pathBoundingBox) {
    const pathWidth = pathBoundingBox.x2 - pathBoundingBox.x1;
    let translateX;
    switch (textAlign) {
      case "center":
        translateX = (width - pathWidth) / 2;
        return `translate(${translateX},0)`;
      case "right":
        translateX = width - pathWidth;
        return `translate(${translateX},0)`;

      default:
        return "";
    }
  }
  return {
    pathParts: context.pathParts,
    pathPartsTransform: context.pathPartsTransform,
    position,
    svgSize,
    lineHeight,
    isVertical,
    domBoxSize: {
      width: config.MaxWidth,
      height: config.MaxHeight,
    },
  };
}

function getCnTextPaths(fontApp, config) {
  const context = createCnWordPathContext();
  const position = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  };
  const svgSize = {
    width: 0,
    height: 0,
  };
  let lineHeight = 26.46;
  const isVertical = !!config.vertical;
  //   编辑器中的选框大小
  const MAX_WIDTH = config.MaxWidth;
  const MAX_HIGHT = config.MaxHeight;

  let accumulatorPathHeight = 0;
  const { textInfoArr, maxItemHeight, line } = mapText(fontApp, config);
  console.log(line);
  const { lineNum, breakLineIndex } = line;
  textInfoArr.forEach((textInfo, index) => {
    accumulatorPathHeight = accumulatorPathHeight + maxItemHeight;

    context.addPath(textInfo.path);
    // const translateX = MAX_WIDTH - textInfo.pathBoundingBox.x2;
  });

  function mapText(fontApp, config) {
    const textInfoArr = [];
    const textArr = config.text.split("");
    // 每列都水平位移，要找出最小的宽度
    let minItemWidth = 99999;
    // 每个字都垂直位移，要找出最大的高度
    let maxItemHeight = 0;
    for (let i = 0; i < textArr.length; i++) {
      const textItem = textArr[i];
      const path = getPath(fontApp, textItem, config.fontSize);
      const pathBoundingBox = path.getBoundingBox();
      const currentPathWidth = pathBoundingBox.x2 - pathBoundingBox.x1;
      if (currentPathWidth < minItemWidth) {
        minItemWidth = currentPathWidth;
      }
      const currentPathHeight = pathBoundingBox.y2 - pathBoundingBox.y1;
      if (currentPathHeight > maxItemHeight) {
        maxItemHeight = currentPathHeight;
      }

      textInfoArr.push({
        path,
        pathBoundingBox,
        text: textItem,
        isBreak: false,
      });
    }
    const line = computedLine(textInfoArr, maxItemHeight);

    return { textInfoArr, minItemWidth, line };
  }
  function computedLine(textInfoArr, height) {
    let lineNum = 1;
    // 换行标记索引
    let breakLineIndex = [];
    let accumulatorPathHeight = 0;
    textInfoArr.forEach((text, index) => {
      if (text.isBreak) {
        doBreak(index);
        return;
      }
      accumulatorPathHeight = accumulatorPathHeight + height;
      if (accumulatorPathHeight > MAX_HIGHT) {
        doBreak(index);
      }
    });
    function doBreak(index) {
      lineNum++;
      accumulatorPathHeight = 0;
      breakLineIndex.push(index);
    }
    return { lineNum, breakLineIndex };
  }
  //   结算当前路径
  function settlePath(context, path, currentPathHeight, currentPathWidth) {
    context.addPath(path);

    const translateY = accumulatorPathHeight - currentPathHeight;
    const translateX = MAX_WIDTH - currentPathWidth;
    context.addTransform(`translate(${translateX},${translateY})`);
    context.resetWord();
  }
  //   计算整体的偏移量
  function computedPathTransform(textAlign) {
    switch (textAlign) {
      case "center":
        offsetX = (MaxHeight - accumulatorPathHeight) / 2;
        return `translate(${translateX},0)`;
      case "right":
        translateX = width - pathWidth;
        return `translate(${translateX},0)`;

      default:
        return "";
    }
  }
  return {
    pathParts: context.pathParts,
    pathPartsAlignTransform: context.pathPartsAlignTransform,
    pathPartsTransform: context.pathPartsTransform,
    position,
    svgSize,
    lineHeight,
    isVertical,
    domBoxSize: {
      width: config.MaxWidth,
      height: config.MaxHeight,
    },
  };
}
