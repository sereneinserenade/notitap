import { mergeAttributes, Node } from "@tiptap/core";
import { NodeSelection } from "prosemirror-state";
import { stopPrevent } from "@/tiptap/utils";

export interface TableRowOptions {
  HTMLAttributes: Record<string, any>;
}

const getElementWithAttributes = (
  name: string,
  attrs?: Record<string, any>,
  events?: Record<string, any>
) => {
  const el = document.createElement(name);

  if (!el) throw new Error(`Element with name ${name} can't be created.`);

  if (attrs) {
    Object.entries(attrs).forEach(([key, val]) => el.setAttribute(key, val));
  }

  if (events) {
    Object.entries(events).forEach(([key, val]) =>
      el.addEventListener(key, val)
    );
  }

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

  addNodeView() {
    return ({
      editor: {
        state: { tr, doc },
        view: { dispatch },
      },
      HTMLAttributes,
      getPos,
      node,
    }) => {
      // Markup
      /*
        <tr class="relative">
          <section onClick={selectCurrentRow} class="absolute -translate-x-full">
            <button class="absolute -translate-x-12"> D </button> <!-- Delete Row -->
          </section>

          <!-- NodeViewContent -->
        </tr>
      */

      const pos = () => (getPos as () => number)();

      const controlSection = getElementWithAttributes(
        "section",
        {
          class: "absolute min-w-2 bg-gray-200 z-50 cursor-pointer",
          "data-drag-handle": true,
          contenteditable: "false",
        },
        {
          click: (e: any) => {
            if (e) stopPrevent(e);

            actions.selectRow();
          },
        }
      );

      const deleteButton = getElementWithAttributes(
        "button",
        {
          class: "btn btn-xs btn-ghost text-base absolute",
        },
        {
          click: (e: any) => {
            if (e) stopPrevent(e);

            actions.deleteRow();
          },
        }
      );

      const actions = {
        deleteRow: () => {
          const from = pos();
          const to = from + node.nodeSize;
          this.editor.chain().deleteRange({ from, to }).focus().run();
        },
        selectRow: () => {
          const from = pos();

          const resolvedFrom = doc.resolve(from);

          const nodeSel = new NodeSelection(resolvedFrom);

          dispatch(tr.setSelection(nodeSel));
        },
      };

      // const tableRow = getElementWithAttributes("tr", { class: "content" });
      const tableRow = getElementWithAttributes(
        "tr",
        {},
        { mouseenter: () => {}, mouseleave: () => {} }
      );

      deleteButton.textContent = "x";

      controlSection.append(deleteButton);

      const contentDOM = getElementWithAttributes("template", {
        class: "content",
      });

      tableRow.append(contentDOM);

      document.body.append(controlSection);

      const repositionControlsCenter = () => {
        const rowCoords = tableRow.getBoundingClientRect();

        controlSection.style.top = `${rowCoords.top}px`;
        controlSection.style.left = `${rowCoords.left - 10}px`;
      };

      const timedRepositionControlsCenter = () =>
        setTimeout(repositionControlsCenter);

      timedRepositionControlsCenter();

      const destroy = () => controlSection.remove();

      return {
        dom: tableRow,
        contentDOM: tableRow,
        destroy,
        update: timedRepositionControlsCenter,
      };
    };
  },

  // addNodeView() {
  //   return ReactNodeViewRenderer(TableRowNodeView, {
  //     as: "tr",
  //     className: "w-full",
  //   });
  // },
});
