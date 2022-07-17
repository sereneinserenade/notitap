import Placeholder from "@tiptap/extension-placeholder";

import { Commands, suggestions } from "../menus";

import { ResizableMedia } from "./resizableMedia";
import { CustomStarterKit } from "./starterKit";
import { Link } from "./link";

interface GetExtensionsProps {
  openLinkModal: () => void;
}

export const getExtensions = ({ openLinkModal }: GetExtensionsProps) => {
  return [
    CustomStarterKit,
    Commands.configure({
      suggestions,
    }),
    Placeholder.configure({
      placeholder: "Type '/' for commands",
    }),
    Link.configure({
      autolink: true,
      linkOnPaste: true,
      protocols: ["mailto"],
      openOnClick: false,
      onModKPressed: openLinkModal,
    }),

    ResizableMedia,
  ];
};
