import { mergeAttributes, Node } from "@tiptap/core";
import { NodeSelection } from "prosemirror-state";
import { throttle } from "lodash";
import { debounce, stopPrevent } from "@/tiptap/utils";

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
    return ({ editor, HTMLAttributes, getPos, node }) => {
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

      const actions = {
        deleteRow: () => {
          this.editor.chain().deleteNode("tableRow").focus().run();
        },
        selectRow: () => {
          const from = pos();

          const resolvedFrom = editor.state.doc.resolve(from);

          const nodeSel = new NodeSelection(resolvedFrom);

          editor.view.dispatch(editor.state.tr.setSelection(nodeSel));
        },
      };

      const controlSection = getElementWithAttributes(
        "section",
        {
          class:
            "absolute flex items-center w-2 bg-gray-200 z-50 cursor-pointer border-1 border-indigo-600 rounded-l opacity-25 hover:opacity-100",
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
          class:
            "btn btn-xs btn-ghost text-sm px-1 absolute -translate-x-[125%] hover:active:-translate-x-[125%] mr-2",
        },
        {
          click: (e: any) => {
            if (e) stopPrevent(e);

            actions.deleteRow();
          },
        }
      );

      const showControls = () => {
        repositionControlsCenter();
        controlSection.classList.remove("opacity-25");
      };

      const hideControls = () => controlSection.classList.add("opacity-25");

      // const tableRow = getElementWithAttributes("tr", { class: "content" });
      const tableRow = getElementWithAttributes(
        "tr",
        { ...HTMLAttributes },
        {
          mouseenter: showControls,
          mouseover: showControls,
          mouseleave: hideControls,
        }
      );

      deleteButton.textContent = "x";

      controlSection.append(deleteButton);

      document.body.append(controlSection);

      let rectBefore = "";

      const repositionControlsCenter = () => {
        const rowCoords = tableRow.getBoundingClientRect();
        const stringifiedRowCoords = JSON.stringify(rowCoords);

        if (rectBefore === stringifiedRowCoords) return;

        controlSection.style.top = `${rowCoords.top}px`;
        controlSection.style.left = `${rowCoords.left - 8}px`;
        controlSection.style.height = `${rowCoords.height + 1}px`;
        // controlSection.style.width = `${rowCoords.width}px`;

        rectBefore = stringifiedRowCoords;
      };

      // const timedRepositionControlsCenter = () =>
      //   throttle(repositionControlsCenter, 100);

      setTimeout(() => {
        repositionControlsCenter();
      }, 100);

      editor.on("selectionUpdate", repositionControlsCenter);
      editor.on("update", repositionControlsCenter);

      const destroy = () => {
        controlSection.remove();
        editor.off("selectionUpdate", repositionControlsCenter);
        editor.off("update", repositionControlsCenter);
      };

      return {
        dom: tableRow,
        contentDOM: tableRow,
        destroy,
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
