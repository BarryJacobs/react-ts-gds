import { ReactElement, useState, useMemo } from "react"
import { Pagination } from "components"
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef,
  TableState
} from "@tanstack/react-table"
import { IoArrowDown, IoArrowUp } from "react-icons/io5"

interface TableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  disableSorting?: boolean
  usePaginationSize?: number
}

export const Table = <T,>({
  data,
  columns,
  disableSorting = false,
  usePaginationSize
}: TableProps<T>): ReactElement => {
  const [pageIndex, setPageIndex] = useState(0)

  const tableState = useMemo(() => {
    const state: Partial<TableState> = {}
    if (usePaginationSize) {
      state.pagination = {
        pageIndex: pageIndex,
        pageSize: usePaginationSize
      }
    }
    return state
  }, [pageIndex, usePaginationSize])

  const table = useReactTable({
    data,
    columns,
    enableSorting: !disableSorting,
    state: tableState,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <>
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
                          className: header.column.getCanSort()
                            ? "govuk-table__header-sortable"
                            : "",
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
          {table.getRowModel().rows.map(row => {
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
      {usePaginationSize && (
        <Pagination
          pageNumbers={
            data.length < usePaginationSize ? 1 : Math.ceil(data.length / usePaginationSize)
          }
          currentPage={pageIndex + 1}
          label="pagination"
          onPageChange={(pageNumber: number) => setPageIndex(pageNumber - 1)}
        />
      )}
    </>
  )
}
