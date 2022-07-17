/* eslint-disable jsx-a11y/no-static-element-interactions */
// Copyright (C) Jeet Ajaybhai Mandaliya - All Rights Reserved
// Unauthorized copying of this file or any file in notitap-pro(this project - https://github.com/sereneinserenade/notitap-pro), via any medium is strictly prohibited
// Proprietary and confidential
// Written by Jeet Ajaybhai Mandaliya <jeet.mandaliya7@gmail.com>, 17th July 2022

import React from "react";
import { NodeViewWrapper, NodeViewProps, NodeViewContent } from "@tiptap/react";

// import "./styles.scss";

export const DraggableBlockNodeView: React.FC<NodeViewProps> = () => {
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
          className="btn btn-xs text-lg btn-ghost p-0 opacity-100 group-hover:opacity-100 transition duration-200 ease-in-out cursor-grab active:cursor-grabbing"
          contentEditable={false}
          draggable
          data-drag-handle
        >
          <i className="i-ic-baseline-drag-indicator" />
        </div>
      </section>

      <NodeViewContent />
    </NodeViewWrapper>
  );
};
