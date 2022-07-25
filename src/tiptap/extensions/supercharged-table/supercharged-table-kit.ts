import { AnyExtension } from "@tiptap/core";

import { Table } from "./extension-table";
import { TableCell } from "./extension-table-cell";
import { TableHeader } from "./extension-table-header";
import { TableRow } from "./extension-table-row";

export const SuperchargedTableExtensions: AnyExtension[] = [
  Table.configure({
    resizable: false,
  }),
  TableCell,
  TableHeader,
  TableRow,
];
