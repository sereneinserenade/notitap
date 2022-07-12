import { useEditor, EditorContent } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import "tippy.js/animations/shift-toward-subtle.css";

import { extensions } from "./extensions";
import { debounce } from "./utils";
import { content } from "./mocks";
import { CustomBubbleMenu } from "./menus";

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

  const addImage = () =>
    editor?.commands.setMedia({
      src: "https://source.unsplash.com/8xznAGy4HcY/800x400",
      "media-type": "img",
      alt: "Something else",
      title: "Something",
      width: "800",
      height: "400",
    });

  const videoUrl =
    "https://user-images.githubusercontent.com/45892659/178123048-0257e732-8cc2-466b-8447-1e2b7cd1b5d9.mov";

  const addVideo = () =>
    editor?.commands.setMedia({
      src: videoUrl,
      "media-type": "video",
      alt: "Some Video",
      title: "Some Title Video",
      width: "400",
      height: "400",
    });

  return (
    editor && (
      <>
        <span className="flex gap-2">
          <button type="button" onClick={() => addImage()}>
            Add Image
          </button>
          <button type="button" onClick={() => addVideo()}>
            Add Video
          </button>
        </span>
        <EditorContent className="w-full" editor={editor} />
        <CustomBubbleMenu editor={editor} />
      </>
    )
  );
};
