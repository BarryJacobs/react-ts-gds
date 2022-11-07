import { ReactElement, ReactNode, useMemo } from "react"
import { useLoaderData } from "react-router-dom"
import { useQuery, QueryClient } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { queryKeys } from "utils"
import { ErrorResponse, User } from "interfaces"
import { Table, ErrorMessage } from "components"
import { request } from "utils"
import { HttpMethodEnum, GDSSize } from "types"

const getUsers = () => ({
  queryKey: [queryKeys.users],
  queryFn: async () => request<User[]>({ method: HttpMethodEnum.GET, path: "/users" })
})

export const loader = (queryClient: QueryClient) => async (): Promise<User[]> => {
  const query = getUsers()
  return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
}

export const Users = (): ReactElement => {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
  const { data, error } = useQuery<User[], ErrorResponse>({ ...getUsers, initialData })

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "Username",
        cell: info => (
          <span className="govuk-!-font-weight-regular">{info.getValue() as ReactNode}</span>
        ),
        accessorFn: row => row.username,
        meta: {
          colClassExt: "govuk-!-width-one-quarter"
        }
      },
      {
        header: "Email",
        accessorFn: row => row.email,
        meta: {
          colClassExt: "govuk-!-width-one-half"
        }
      },
      {
        header: "Phone",
        accessorFn: row => row.phone,
        meta: {
          colClassExt: "govuk-!-width-one-quarter",
          dataClassExt: "numeric"
        }
      }
    ],
    []
  )

  return (
    <>
      {error && <ErrorMessage title={error.title} description={error.description} />}
      {data && (
        <Table
          caption="Users"
          captionSize={GDSSize.large}
          columns={columns}
          data={data}
          usePaginationSize={7}
          disableSorting={false}
        />
      )}
    </>
  )
}
