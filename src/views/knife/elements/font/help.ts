export function injectFontFamilies(
  fonts: { fontFamily: string; src: string }[],
  nodeId = "ownFontStyle"
) {
  // 先检查是否存在
  let node = document.getElementById(nodeId) as HTMLStyleElement;

  if (!node) {
    node = document.createElement("style") as HTMLStyleElement;
    node.setAttribute("id", nodeId);
    document.body.appendChild(node);
  }

  const fontUrlList = [];

  if (node?.sheet?.rules.length) {
    for (const i in node.sheet.rules) {
      const item = node.sheet.rules[i];
      if (item.cssText) {
        const items = item.cssText.match(/url\("(.*)?"\)/);
        if (items && items.length === 2) {
          fontUrlList.push(items[1]);
        }
      }
    }
  }

  // 不存在则注入
  for (const font of fonts) {
    const { fontFamily, src } = font;
    if (fontUrlList.includes(src)) {
      continue;
    }

    const content = `@font-face{font-family:"${fontFamily}"; src:url("${src}")}`;
    node.appendChild(document.createTextNode(content));

    fontUrlList.push(font.src);
  }
}
