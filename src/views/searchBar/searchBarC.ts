import { h, render } from "vue";
import search from "./serachBar.vue";

class SerachBarCreator {
  container: HTMLDivElement;
  constructor() {
    this.container = document.createElement("div");
  }
  show() {
    let vnode = h(search);
    render(vnode, this.container);
    console.log(this.container);
    // this.container.className = "search-input";
    // Node.appendChild() 方法将一个节点附加到指定父节点的子节点列表的末尾处。
    // 如果将被插入的节点已经存在于当前文档的文档树中，那么 appendChild() 只会将它从原先的位置移动到新的位置（不需要事先移除要移动的节点）。
    document.body.appendChild(this.container);
  }
  hide() {
    // render(null, this.container);
    document.body.removeChild(this.container);
  }
}
let searchBar = new SerachBarCreator();

export default searchBar;
