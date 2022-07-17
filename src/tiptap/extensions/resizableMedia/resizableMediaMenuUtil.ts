// Copyright (C) Jeet Ajaybhai Mandaliya - All Rights Reserved
// Unauthorized copying of this file or any file in notitap-pro(this project - https://github.com/sereneinserenade/notitap-pro), via any medium is strictly prohibited
// Proprietary and confidential
// Written by Jeet Ajaybhai Mandaliya <jeet.mandaliya7@gmail.com>, 17th July 2022

/* @unocss-include */
// import { IconAlignCenter, IconAlignLeft, IconAlignRight, IconFloatLeft, IconFloatRight, IconDelete } from '~/assets'

interface ResizableMediaAction {
  tooltip: string;
  icon?: string;
  action?: (updateAttributes: (o: Record<string, any>) => any) => void;
  isActive?: (attrs: Record<string, any>) => boolean;
  delete?: (d: () => void) => void;
}

export const resizableMediaActions: ResizableMediaAction[] = [
  {
    tooltip: "Align left",
    action: (updateAttributes) =>
      updateAttributes({
        dataAlign: "left",
        dataFloat: null,
      }),
    icon: "i-mdi-format-align-left",
    isActive: (attrs) => attrs.dataAlign === "left",
  },
  {
    tooltip: "Align center",
    action: (updateAttributes) =>
      updateAttributes({
        dataAlign: "center",
        dataFloat: null,
      }),
    icon: "i-mdi-format-align-center",
    isActive: (attrs) => attrs.dataAlign === "center",
  },
  {
    tooltip: "Align right",
    action: (updateAttributes) =>
      updateAttributes({
        dataAlign: "right",
        dataFloat: null,
      }),
    icon: "i-mdi-format-align-right",
    isActive: (attrs) => attrs.dataAlign === "right",
  },
  {
    tooltip: "Float left",
    action: (updateAttributes) =>
      updateAttributes({
        dataAlign: null,
        dataFloat: "left",
      }),
    icon: "i-mdi-format-float-left",
    isActive: (attrs) => attrs.dataFloat === "left",
  },
  {
    tooltip: "Float right",
    action: (updateAttributes) =>
      updateAttributes({
        dataAlign: null,
        dataFloat: "right",
      }),
    icon: "i-mdi-format-float-right",
    isActive: (attrs) => attrs.dataFloat === "right",
  },
  {
    tooltip: "Delete",
    icon: "i-mdi-delete",
    delete: (deleteNode) => deleteNode(),
  },
];
