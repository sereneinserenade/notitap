// Copyright (C) Jeet Ajaybhai Mandaliya - All Rights Reserved
// Unauthorized copying of this file or any file in notitap-pro(this project - https://github.com/sereneinserenade/notitap-pro), via any medium is strictly prohibited
// Proprietary and confidential
// Written by Jeet Ajaybhai Mandaliya <jeet.mandaliya7@gmail.com>, 17th July 2022

import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";

export const Commands = Extension.create({
  name: "slash-commands",

  addOptions() {
    return {
      suggestions: {
        char: "/",
        command: ({ editor, range, props }: any) =>
          props.command({ editor, range }),
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestions,
      }),
    ];
  },
});
