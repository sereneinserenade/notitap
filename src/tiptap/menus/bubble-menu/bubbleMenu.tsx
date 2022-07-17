// Copyright (C) Jeet Ajaybhai Mandaliya - All Rights Reserved
// Unauthorized copying of this file or any file in notitap-pro(this project - https://github.com/sereneinserenade/notitap-pro), via any medium is strictly prohibited
// Proprietary and confidential
// Written by Jeet Ajaybhai Mandaliya <jeet.mandaliya7@gmail.com>, 17th July 2022

import { BubbleMenu, Editor } from "@tiptap/react";

import { generalButtons } from "./buttons";

interface CustomBubbleMenuProps {
  editor: Editor;
}

export const CustomBubbleMenu: React.FC<CustomBubbleMenuProps> = ({
  editor,
}) => {
  return (
    <BubbleMenu
      editor={editor}
      className="shadow bg-white rounded-sm overflow-hidden border border-slate-200 box-border"
      tippyOptions={{
        duration: 200,
        animation: "shift-toward-subtle",
        moveTransition: "transform 0.2s ease-in-out",
      }}
    >
      {generalButtons.map((btn) => {
        return (
          // TODO: figure out why tooltips are not working
          <div className="tooltip" key={btn.tooltip} data-tip={btn.tooltip}>
            <button
              type="button"
              className="btn btn-xs btn-ghost rounded-none h-8 px-2"
              onClick={() => btn.action(editor)}
            >
              <i className={`${btn.iconClass} scale-150`} />
            </button>
          </div>
        );
      })}
    </BubbleMenu>
  );
};
