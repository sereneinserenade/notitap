/* eslint-disable no-param-reassign */
import { Node as ProseMirrorNode } from "prosemirror-model";
import { NodeView } from "prosemirror-view";

export class TableRowNodeView implements NodeView {
  node: ProseMirrorNode;

  cellMinWidth: number;

  dom: Element;

  table: HTMLTableElement;

  colgroup: Element;

  contentDOM: HTMLElement;

  constructor(node: ProseMirrorNode, cellMinWidth: number) {
    this.node = node;
    this.cellMinWidth = cellMinWidth;
    this.dom = document.createElement("div");
    this.dom.className = "tableWrapper";
    this.table = this.dom.appendChild(document.createElement("table"));
    this.colgroup = this.table.appendChild(document.createElement("colgroup"));
    this.contentDOM = this.table.appendChild(document.createElement("tbody"));
  }

  update(node: ProseMirrorNode) {
    if (node.type !== this.node.type) {
      return false;
    }

    this.node = node;

    return true;
  }

  ignoreMutation(
    mutation: MutationRecord | { type: "selection"; target: Element }
  ) {
    return (
      mutation.type === "attributes" &&
      (mutation.target === this.table ||
        this.colgroup.contains(mutation.target))
    );
  }

  // deleteNode(): void {
  // const from = this.getPos();
  // const to = from + this.node.nodeSize;
  // this.editor.commands.deleteRange({ from, to });
  // }
}
