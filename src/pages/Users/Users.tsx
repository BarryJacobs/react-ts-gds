import { ReactElement, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { queryKeys, getUsers } from "utils"
import { ErrorResponse, User } from "interfaces"
import { Table } from "components"

export const Users = (): ReactElement => {
  const { data } = useQuery<User[], ErrorResponse>([queryKeys.users], getUsers)
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "Name",
        cell: info => info.getValue(),
        accessorFn: row => row.name
      }
    ],
    []
  )

  return <>{data && <Table columns={columns} data={data} />}</>
}
