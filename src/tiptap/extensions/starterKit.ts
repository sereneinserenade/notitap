import StarterKit from "@tiptap/starter-kit";

export const CustomStarterKit = StarterKit.configure({
  heading: {
    levels: [1, 2, 3],
  },

  // document is not optional
  // document: false,

  // commented things will be included
  // text: false,
  // paragraph: false,
  // bold: true,
  // italic: false,
  // dropcursor: false,
  // gapcursor: false,
  // history: false,

  hardBreak: false,
  horizontalRule: false,
  blockquote: false,
  bulletList: false,
  code: false,
  codeBlock: false,
  listItem: false,
  orderedList: false,
  strike: false,
});
