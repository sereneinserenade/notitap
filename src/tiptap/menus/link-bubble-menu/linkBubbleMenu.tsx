import { Editor } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/react";

import { useEffect, useState } from "react";
import { test } from "linkifyjs";
import classNames from "classnames";

// import { BubbleMenu } from "../../extensions/bubble-menu";

interface CustomBubbleMenuProps {
  editor: Editor;
}

export const LinkBubbleMenu: React.FC<CustomBubbleMenuProps> = ({ editor }) => {
  const [isLinkActive, setIsLinkActive] = useState(false);

  const [linkHref, setLinkHref] = useState("");

  const [isLinkHrefValid, setIsLinkHrefValid] = useState(true);

  useEffect(() => {
    setIsLinkHrefValid(test(linkHref));
  }, [linkHref]);

  const processLink = () => {
    const active = editor.isActive("link");

    setIsLinkActive(active);

    if (!active) {
      setLinkHref("");
      return;
    }

    const href = editor.getAttributes("link")?.href;

    setLinkHref(href || "");
  };

  useEffect(() => {
    editor.on("selectionUpdate", processLink);

    return () => {
      editor.off("selectionUpdate", processLink);
    };
  });

  const setOrUpdateCurrentLink = () => {
    if (!isLinkHrefValid) return;

    if (!isLinkActive) return;

    // update existing link
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: linkHref })
      .run();
  };

  return (
    <BubbleMenu
      editor={editor}
      className={`
        shadow bg-white rounded-sm overflow-hidden border border-slate-200 box-border p-2
      `}
      tippyOptions={{
        placement: "bottom",
        duration: 200,
        animation: "shift-toward-subtle",
        moveTransition: "transform 0.2s ease-in-out",
      }}
      shouldShow={({ editor: e }) => e.isActive("link")}
    >
      <input
        type="url"
        placeholder="https://example.com"
        className={classNames(
          "input input-bordered w-[30ch] input-sm",
          isLinkHrefValid ? "" : "input-error"
        )}
        value={linkHref}
        onChange={(e) =>
          setLinkHref((e.target as HTMLInputElement).value.trim())
        }
        onKeyDown={(e) => e.code === "Enter" && setOrUpdateCurrentLink()}
      />
    </BubbleMenu>
  );
};
