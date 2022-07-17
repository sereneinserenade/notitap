import Text from "@tiptap/extension-text";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import DropCursor from "@tiptap/extension-dropcursor";
import GapCursor from "@tiptap/extension-gapcursor";
import History from "@tiptap/extension-history";

import { Document } from "./doc";
import { DraggableBlock } from "./draggable-block";
import { Link } from "./link";
import { Paragraph } from "./paragraph";

interface GetExtensionsProps {
  openLinkModal: () => void;
}

export const getExtensions = ({ openLinkModal }: GetExtensionsProps) => {
  return [
    // Necessary
    Document,
    DraggableBlock,
    Paragraph,
    Text,
    DropCursor.configure({
      width: 2,
      class: "notitap-dropcursor",
      color: "skyblue",
    }),
    GapCursor,
    History,

    // marks
    Bold,
    Italic,
    Strike,
    Underline,
    Link.configure({
      autolink: true,
      linkOnPaste: true,
      protocols: ["mailto"],
      openOnClick: false,
      onModKPressed: openLinkModal,
    }),

    // Node
    ListItem,
    BulletList,
    OrderedList,
  ];
};
