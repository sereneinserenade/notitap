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
        dataAlign: "start",
        dataFloat: null,
      }),
    icon: "i-mdi-format-align-left",
    isActive: (attrs) => attrs.dataAlign === "start",
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
        dataAlign: "end",
        dataFloat: null,
      }),
    icon: "i-mdi-format-align-right",
    isActive: (attrs) => attrs.dataAlign === "end",
  },
  {
    tooltip: "Delete",
    icon: "i-mdi-delete",
    delete: (deleteNode) => deleteNode(),
  },
];
