import { mergeAttributes, Node } from "@tiptap/core";
import { NodeSelection } from "prosemirror-state";
import { stopPrevent } from "@/tiptap/utils";

export interface TableRowOptions {
  HTMLAttributes: Record<string, any>;
}

const isScrollable = function (ele: any) {
  const hasScrollableContent = ele.scrollHeight > ele.clientHeight;

  const overflowYStyle = window.getComputedStyle(ele).overflowY;
  const isOverflowHidden = overflowYStyle.indexOf("hidden") !== -1;

  return hasScrollableContent && !isOverflowHidden;
};

const getScrollableParent = function (ele: any): any {
  // eslint-disable-next-line no-nested-ternary
  return !ele || ele === document.body
    ? document.body
    : isScrollable(ele)
    ? ele
    : getScrollableParent(ele.parentNode);
};

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
    return ({ editor, HTMLAttributes, getPos }) => {
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

      const scrollableParent = getScrollableParent(
        editor.options.element
      ) as HTMLDivElement;

      let isCursorInsideControlSection = false;

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

      const setCursorInsideControlSection = () => {
        isCursorInsideControlSection = true;
      };

      const setCursorOutsideControlSection = () => {
        isCursorInsideControlSection = false;
      };

      const controlSection = getElementWithAttributes(
        "section",
        {
          class:
            "absolute hidden flex items-center w-2 bg-gray-200 z-50 cursor-pointer border-1 border-indigo-600 rounded-l opacity-25 hover:opacity-100",
          contenteditable: "false",
        },
        {
          click: (e: any) => {
            if (e) stopPrevent(e);

            actions.selectRow();
          },
          mouseenter: () => {
            setCursorInsideControlSection();
          },
          mouseover: () => {
            setCursorInsideControlSection();
          },
          mouseleave: () => {
            setCursorOutsideControlSection();
            hideControls();
          },
        }
      );

      const deleteButton = getElementWithAttributes(
        "button",
        {
          class:
            "text-sm px-1 absolute -translate-x-[125%] hover:active:-translate-x-[125%] mr-2",
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
        controlSection.classList.remove("hidden");
      };

      const hideControls = () => {
        setTimeout(() => {
          if (isCursorInsideControlSection) return;
          controlSection.classList.add("hidden");
        }, 100);
      };

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
        setTimeout(() => {
          const rowCoords = tableRow.getBoundingClientRect();
          const stringifiedRowCoords = JSON.stringify(rowCoords);

          if (rectBefore === stringifiedRowCoords) return;

          controlSection.style.top = `${
            rowCoords.top + document.documentElement.scrollTop
          }px`;
          controlSection.style.left = `${
            rowCoords.x + document.documentElement.scrollLeft - 8
          }px`;
          controlSection.style.height = `${rowCoords.height + 1}px`;

          rectBefore = stringifiedRowCoords;
        });
      };

      setTimeout(() => {
        repositionControlsCenter();
      }, 100);

      editor.on("selectionUpdate", repositionControlsCenter);
      editor.on("update", repositionControlsCenter);
      scrollableParent?.addEventListener("scroll", repositionControlsCenter);
      document.addEventListener("scroll", repositionControlsCenter);

      const destroy = () => {
        controlSection.remove();
        editor.off("selectionUpdate", repositionControlsCenter);
        editor.off("update", repositionControlsCenter);
        scrollableParent?.removeEventListener(
          "scroll",
          repositionControlsCenter
        );
        document.removeEventListener("scroll", repositionControlsCenter);
      };

      return {
        dom: tableRow,
        contentDOM: tableRow,
        destroy,
      };
    };
  },
});
