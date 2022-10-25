import { ReactElement } from "react"
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef
} from "@tanstack/react-table"
import { IoArrowDown, IoArrowUp } from "react-icons/io5"

interface TableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
}

export const Table = <T,>({ data, columns }: TableProps<T>): ReactElement => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  return (
    <table className="govuk-table">
      <thead className="govuk-table__head">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <th className="govuk-table__header" key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <span
                      {...{
                        className: header.column.getCanSort() ? "govuk-table__header-sortable" : "",
                        onClick: header.column.getToggleSortingHandler()
                      }}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <IoArrowUp />,
                        desc: <IoArrowDown />
                      }[header.column.getIsSorted() as string] ?? null}
                    </span>
                  )}
                </th>
              )
            })}
          </tr>
        ))}
      </thead>
      <tbody className="govuk-table__body">
        {table
          .getRowModel()
          .rows.slice(0, 10)
          .map(row => {
            return (
              <tr className="govuk-table__row" key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td className="govuk-table__cell" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                })}
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}
