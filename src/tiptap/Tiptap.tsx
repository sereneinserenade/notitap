import { useEditor, EditorContent } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import "tippy.js/animations/shift-toward-subtle.css";

import { extensions } from "./extensions";
import { debounce } from "./utils";
import { content } from "./mocks";

import "./styles/tiptap.scss";

export const Tiptap = () => {
  const logContent = (e: Editor) => console.log(JSON.stringify(e.getJSON()));

  const debouncedLogContent = debounce(logContent, 500);

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: "prose focus:outline-none w-full",
        spellcheck: "false",
      },
    },
    onUpdate({ editor: e }) {
      debouncedLogContent(e);
    },
  });

  return <EditorContent className="w-full" editor={editor} />;
};
