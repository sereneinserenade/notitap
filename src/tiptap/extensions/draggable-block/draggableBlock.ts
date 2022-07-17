// Copyright (C) Jeet Ajaybhai Mandaliya - All Rights Reserved
// Unauthorized copying of this file or any file in notitap-pro(this project - https://github.com/sereneinserenade/notitap-pro), via any medium is strictly prohibited
// Proprietary and confidential
// Written by Jeet Ajaybhai Mandaliya <jeet.mandaliya7@gmail.com>, 17th July 2022

import { Node, mergeAttributes, Content } from "@tiptap/core";
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
    return [{ tag: 'article[data-type="draggable-block"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "article",
      mergeAttributes(HTMLAttributes, { "data-type": "draggable-block" }),
      0,
    ];
  },

  addCommands() {
    return {
      setDraggableBlock:
        () =>
        ({ chain, state, commands }) => {
          const {
            selection: { $head, from, to },
            doc,
          } = state;

          const parent = $head.node($head.depth - 1);

          if (parent.type.name !== "draggableBlock") return false;

          let currentActiveNodeTo = -1;

          doc.descendants((node, pos) => {
            if (currentActiveNodeTo !== -1) return false;

            const [nodeFrom, nodeTo] = [pos, pos + node.nodeSize];

            if (nodeFrom <= from && to <= nodeTo) currentActiveNodeTo = nodeTo;

            return false;
          });

          let textContent;

          const textOnRight = doc.textBetween(from, currentActiveNodeTo);

          if (textOnRight) {
            textContent = {
              type: "text",
              text: textOnRight,
            };
          }

          return chain()
            .focus("start")
            .insertContentAt(
              { from, to: currentActiveNodeTo },
              {
                type: this.name,
                content: [
                  {
                    type: "paragraph",
                    content: textContent ? [textContent] : [],
                  },
                ],
              }
            )
            .focus(from + 3)
            .run();
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(DraggableBlockNodeView);
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setDraggableBlock(),
      Enter: () => this.editor.commands.setDraggableBlock(),
    };
  },
});
