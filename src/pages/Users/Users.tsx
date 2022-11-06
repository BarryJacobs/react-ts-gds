import { ReactElement, ReactNode, useMemo } from "react"
import { useLoaderData } from "react-router-dom"
import { useQuery, QueryClient } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { useAuthorisation } from "hooks"
import { queryKeys } from "utils"
import { ErrorResponse, User } from "interfaces"
import { Table, ErrorMessage } from "components"
import { request } from "utils"
import { HttpMethodEnum, AuthorisationHeaders, GDSSize } from "types"

const getUsers = (headers: AuthorisationHeaders) => ({
  queryKey: [queryKeys.users],
  queryFn: async () => request<User[]>({ method: HttpMethodEnum.GET, path: "/users", headers })
})

export const loader =
  (queryClient: QueryClient, headers: AuthorisationHeaders) => async (): Promise<User[]> => {
    const query = getUsers(headers)
    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
  }

export const Users = (): ReactElement => {
  const { jsonHeaders } = useAuthorisation()
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
  const { data, error } = useQuery<User[], ErrorResponse>({ ...getUsers(jsonHeaders), initialData })

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
