import React, { useRef, useState } from "react";
import { NodeViewWrapper, NodeViewProps, NodeViewContent } from "@tiptap/react";
import { NodeSelection } from "prosemirror-state";

// import "./styles.scss";

export const DraggableBlockNodeView = ({
  node,
  updateAttributes,
  deleteNode,
  editor,
  getPos,
}: NodeViewProps) => {
  const [isCurrentNodeSelected, setIsCurrentNodeSelected] = useState(false);

  return (
    <NodeViewWrapper
      as="div"
      className="flex gap-2 group p-1 w-full box-border"
    >
      <section className="flex" aria-label="left-menu" contentEditable="false">
        {/* <button type="button" className="btn btn-ghost btn-sm">
          <i className="i-mdi-plus" />
        </button> */}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className="btn btn-xs text-lg btn-ghost p-0 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out"
          contentEditable={false}
          draggable
          data-drag-handle
          onDragStart={() => setIsCurrentNodeSelected(true)}
          onDragEnd={() =>
            setTimeout(() => setIsCurrentNodeSelected(false), 250)
          }
        >
          <i className="i-ic-baseline-drag-indicator" />
        </div>
      </section>

      <NodeViewContent />
    </NodeViewWrapper>
  );
};
