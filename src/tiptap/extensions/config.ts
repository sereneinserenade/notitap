import Placeholder from "@tiptap/extension-placeholder";

import { Commands, suggestions } from "../menus";
import { CustomStarterKit } from "./starterKit";
import { ResizableMedia } from "./resizableMedia";

export const extensions = [
  CustomStarterKit,
  Commands.configure({
    suggestions,
  }),
  Placeholder.configure({
    placeholder: "Type '/' for commands",
  }),
  ResizableMedia,
];
