/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useEffect, useRef, useState } from "react";
import { NodeViewContent, NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import Tippy from "@tippyjs/react";

import "./styles.scss";

interface CellButton {
  name: string;
  action: (editor: Editor) => boolean;
  iconClass?: string;
}

const cellButtonsConfig: CellButton[] = [
  {
    name: "Add row above",
    action: (editor) => editor.chain().focus().addRowBefore().run(),
    iconClass: "i-mdi-table-row-plus-before",
  },
  {
    name: "Add row below",
    action: (editor) => editor.chain().focus().addRowAfter().run(),
    iconClass: "i-mdi-table-row-plus-after",
  },
  {
    name: "Add column before",
    action: (editor) => editor.chain().focus().addColumnBefore().run(),
    iconClass: "i-mdi-table-column-plus-before",
  },
  {
    name: "Add column after",
    action: (editor) => editor.chain().focus().addColumnAfter().run(),
    iconClass: "i-mdi-table-column-plus-after",
  },
  {
    name: "Remove row",
    action: (editor) => editor.chain().focus().deleteRow().run(),
    iconClass: "i-mdi-table-row-remove",
  },
  {
    name: "Remove col",
    action: (editor) => editor.chain().focus().deleteColumn().run(),
    iconClass: "i-mdi-table-column-remove",
  },
  {
    name: "Toggle header row",
    action: (editor) => editor.chain().focus().toggleHeaderRow().run(),
    iconClass: "i-mdi-table-row",
  },
  {
    name: "Toggle header column",
    action: (editor) => editor.chain().focus().toggleHeaderColumn().run(),
    iconClass: "i-mdi-table-column",
  },
  {
    name: "Toggle header cell",
    action: (editor) => editor.chain().focus().toggleHeaderCell().run(),
    iconClass: "i-mdi-table-border",
  },
  {
    name: "Remove table",
    action: (editor) => editor.chain().focus().deleteTable().run(),
    iconClass: "i-mdi-table-remove",
  },
];

export const TableCellNodeView: FC<NodeViewProps> = ({
  node,
  getPos,
  selected,
  editor,
}) => {
  const [isCurrentCellActive, setIsCurrentCellActive] = useState(false);

  const tableCellOptionsButtonRef = useRef<HTMLLabelElement>(null);

  const calculateActiveSateOfCurrentCell = () => {
    const { from, to } = editor.state.selection;

    const nodeFrom = getPos();
    const nodeTo = nodeFrom + node.nodeSize;

    setIsCurrentCellActive(nodeFrom <= from && to <= nodeTo);
  };

  useEffect(() => {
    editor.on("selectionUpdate", calculateActiveSateOfCurrentCell);

    setTimeout(calculateActiveSateOfCurrentCell, 100);

    return () => {
      editor.off("selectionUpdate", calculateActiveSateOfCurrentCell);
    };
  });

  const gimmeDropdownStyles = (): React.CSSProperties => {
    let top = tableCellOptionsButtonRef.current?.clientTop;
    if (top) top += 5;

    let left = tableCellOptionsButtonRef.current?.clientLeft;
    if (left) left += 5;

    return {
      top: `${top}px`,
      left: `${left}px`,
    };
  };

  return (
    <NodeViewWrapper>
      <NodeViewContent as="span" />

      {(isCurrentCellActive || selected) && (
        <Tippy
          appendTo={document.body}
          trigger="click"
          interactive
          animation="shift-toward-subtle"
          placement="right-start"
          content={
            <article className="dropdown" contentEditable={false}>
              <ul
                tabIndex={0}
                className="dropdown-content fixed menu menu-compact p-2 shadow bg-base-100 rounded-box w-56"
                style={gimmeDropdownStyles()}
              >
                {cellButtonsConfig.map((btn) => {
                  return (
                    <li key={btn.name}>
                      <button
                        type="button"
                        className="button"
                        onClick={() => btn.action(editor)}
                      >
                        <span>
                          <i className={btn.iconClass} />
                        </span>

                        <span>{btn.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </article>
          }
        >
          <label
            tabIndex={0}
            className="trigger-button"
            contentEditable={false}
          >
            <i className="i-mdi-chevron-down text-base scale-150" />
          </label>
        </Tippy>
      )}
    </NodeViewWrapper>
  );
};
