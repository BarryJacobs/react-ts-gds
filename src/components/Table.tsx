import { ReactElement, useState, useMemo, useCallback, AriaAttributes } from "react"
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
import { concatenateStrings } from "utils"
import { GDSSize } from "types"

interface TableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  caption?: string
  captionSize?: GDSSize
  disableSorting?: boolean
  usePaginationSize?: number
}

export const Table = <T,>({
  data,
  columns,
  caption,
  captionSize = GDSSize.medium,
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

  const pageSize = useMemo(() => {
    if (usePaginationSize == undefined || data === undefined || data.length === 0) return 0
    return data.length < usePaginationSize ? 1 : Math.ceil(data.length / usePaginationSize)
  }, [data, usePaginationSize])

  const onPageChangeHandler = useCallback(
    (pageNumber: number) => setPageIndex(pageNumber - 1),
    [setPageIndex]
  )

  return (
    <>
      <table className="govuk-table">
        {caption && (
          <caption className={`govuk-table__caption govuk-table__caption--${captionSize}`}>
            {caption}
          </caption>
        )}
        <thead className="govuk-table__head">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const columnSorted = header.column.getIsSorted()
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={concatenateStrings(
                      " ",
                      "govuk-table__header",
                      header.column.columnDef.meta?.colClassExt,
                      `govuk-table__header--${header.column.columnDef.meta?.dataClassExt}`
                    )}
                    scope="col"
                    onClick={header.column.getToggleSortingHandler()}
                    aria-sort={
                      {
                        asc: "ascending",
                        desc: "descending",
                        false: undefined
                      }[columnSorted as string] as AriaAttributes["aria-sort"]
                    }>
                    {header.isPlaceholder ? null : (
                      <span
                        className={
                          header.column.getCanSort() ? "govuk-table__header-sortable" : ""
                        }>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <IoArrowUp />,
                          desc: <IoArrowDown />
                        }[columnSorted as string] ?? null}
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
                    <td
                      className={`govuk-table__cell${
                        cell.column.columnDef.meta?.dataClassExt
                          ? ` govuk-table__cell--${cell.column.columnDef.meta?.dataClassExt}`
                          : ""
                      }`}
                      key={cell.id}>
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
          pageNumbers={pageSize}
          currentPage={pageIndex + 1}
          label="pagination"
          onPageChange={onPageChangeHandler}
        />
      )}
    </>
  )
}
