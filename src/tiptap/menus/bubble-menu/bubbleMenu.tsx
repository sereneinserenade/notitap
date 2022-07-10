import { BubbleMenu, Editor } from "@tiptap/react";

import { buttons } from "./buttons";

interface CustomBubbleMenuProps {
  editor: Editor;
}

export const CustomBubbleMenu: React.FC<CustomBubbleMenuProps> = ({
  editor,
}) => {
  return (
    <BubbleMenu
      editor={editor}
      className="shadow bg-white rounded-sm overflow-hidden"
    >
      {buttons.map((btn) => {
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
