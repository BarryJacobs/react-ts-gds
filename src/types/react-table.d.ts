/* eslint-disable */
import { RowData } from "@tanstack/table-core"

declare module "@tanstack/table-core" {
  export interface ColumnMeta<TData extends RowData, TValue> {
    colClassExt?: string
    dataClassExt?: string
  }
}
