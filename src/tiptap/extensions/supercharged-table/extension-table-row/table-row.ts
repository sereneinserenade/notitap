import { mergeAttributes, Node } from "@tiptap/core";

export interface TableRowOptions {
  HTMLAttributes: Record<string, any>;
}

const getElementWithAttributes = (
  name: string,
  attrs: Record<string, any> = {}
) => {
  const el = document.createElement(name);

  if (!el) throw new Error(`Element with name ${name} can't be created.`);

  Object.entries(attrs).forEach(([key, val]) => {
    el.setAttribute(key, val);
  });

  return el;
};

export const TableRow = Node.create<TableRowOptions>({
  name: "tableRow",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  content: "(tableCell | tableHeader)*",

  tableRole: "row",

  parseHTML() {
    return [{ tag: "tr" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "tr",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  // addNodeView() {
  //   return ({ editor, HTMLAttributes, getPos, node }) => {
  //     // Markup
  //     /*
  //       <tr class="relative">
  //         <section>
  //           <button> Delete Row </button>

  //         </section>

  //         <div class="content"> </div>
  //       </tr>
  //     */

  //     const div = getElementWithAttributes("div");

  //     const tr = getElementWithAttributes("tr", { class: "content" });

  //     const controlSection = getElementWithAttributes("section");

  //     const deleteButton = getElementWithAttributes("button");

  //     controlSection.append(deleteButton);

  //     const contentDOM = getElementWithAttributes("div", {
  //       class: "content",
  //     });

  //     // tr.append(contentDOM);

  //     return {
  //       dom: div,
  //       contentDOM: tr,
  //     };
  //   };
  // },

  // addNodeView() {
  //   return ReactNodeViewRenderer(TableRowNodeView, {
  //     as: "tr",
  //     className: "w-full",
  //   });
  // },
});
