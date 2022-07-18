import { mergeAttributes, Node, ReactNodeViewRenderer } from "@tiptap/react";

import { FileNodeView } from "./FileNodeView";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    setFile: {
      /**
       * Set a file node
       */
      setFile: (options: Record<string, any>) => ReturnType;
    };
  }
}

interface FileOptions {
  inline: boolean;
  HTMLAttributes: Record<string, any>;
}

export const File = Node.create<FileOptions>({
  name: "file",

  content: "text*",

  marks: "",

  group() {
    return "block";
    // return this.options.inline ? 'inline' : 'block'
  },

  code: true,

  defining: true,

  addOptions() {
    return {
      inline: true,
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      file: {
        default: null,
        parseHTML: (el: HTMLDivElement) => {
          const fileDateString = (el as HTMLSpanElement).getAttribute(
            "data-file"
          );

          if (fileDateString) return JSON.parse(fileDateString);
          return {};
        },
        renderHTML: ({ file }: Record<string, any>) => {
          const fileVal = file ? JSON.stringify(file) : "{}";

          return { "data-file": fileVal };
        },
      },
      title: {
        default: "New File",
        parseHTML: (el: HTMLDivElement) => el.getAttribute("data-title"),
        renderHTML: (attrs: Record<string, any>) => ({
          "data-title": attrs.title,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "file",
      },
    ];
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, string> }) {
    return [
      "file",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setFile:
        (options: Record<string, any>) =>
        ({ commands }) => {
          return commands.insertContent([
            {
              type: "paragraph",
              content: [],
            },
            {
              type: this.name,
              attrs: options,
            },
            {
              type: "paragraph",
              content: [],
            },
          ]);
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(FileNodeView);
  },
});
