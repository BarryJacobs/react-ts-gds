import { ReactElement, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { queryKeys, getUsers } from "utils"
import { ErrorResponse, User } from "interfaces"
import { Table } from "components"

export const Users = (): ReactElement => {
  const { data, error } = useQuery<User[], ErrorResponse>([queryKeys.users], getUsers)
  console.log(error)
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "Username",
        cell: info => info.getValue(),
        accessorFn: row => row.username
      },
      {
        header: "Name",
        cell: info => info.getValue(),
        accessorFn: row => row.name
      },
      {
        header: "Email",
        cell: info => info.getValue(),
        accessorFn: row => row.email
      },
      {
        header: "Phone",
        cell: info => info.getValue(),
        accessorFn: row => row.phone
      }
    ],
    []
  )

  return <>{data && <Table columns={columns} data={data} />}</>
}
