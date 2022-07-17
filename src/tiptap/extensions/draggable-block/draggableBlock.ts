import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { DraggableBlockNodeView } from "./draggableBlockNodeView";

export interface DraggableBlockOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    draggableBlock: {
      /**
       * Toggle a draggableBlock
       */
      setDraggableBlock: () => ReturnType;
    };
  }
}

export const DraggableBlock = Node.create<DraggableBlockOptions>({
  name: "draggableBlock",

  priority: 1000,

  group: "block",

  content: "block",

  draggable: true,

  selectable: true,

  inline: false,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="draggable-block"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "draggable-block" }),
      0,
    ];
  },

  addCommands() {
    return {
      setDraggableBlock:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name);
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(DraggableBlockNodeView);
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setDraggableBlock(),
    };
  },
});
