import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content:
      "<p>This is notetap. A notion-like plug and play editor built on top of Tiptap/ProseMirror.</p>",
    editorProps: {
      attributes: {
        class: "prose focus:outline-none w-full",
      },
    },
  });

  return <EditorContent className="w-full" editor={editor} />;
};
