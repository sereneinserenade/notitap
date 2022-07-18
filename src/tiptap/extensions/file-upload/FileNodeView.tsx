import React from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";

export const FileNodeView: React.FC<NodeViewProps> = ({ node }) => {
  return (
    <NodeViewWrapper as="div" className="card w-96 shadow-xl my-4">
      <article
        className="card-body w-full flex flex-row"
        contentEditable={false}
      >
        <a
          className="link text-2xl "
          href={node.attrs.file.src}
          target="_blank"
          rel="noreferrer"
        >
          {node.attrs.title}
        </a>
      </article>
    </NodeViewWrapper>
  );
};
