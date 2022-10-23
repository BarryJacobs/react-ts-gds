import { ReactElement, useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { queryKeys, getUsers } from "utils"
import { ErrorResponse, User } from "interfaces"

export const Users = (): ReactElement => {
  const [count, setCount] = useState(0)
  const { data, error } = useQuery<User[], ErrorResponse>([queryKeys.users], getUsers)

  const onClick = () => {
    setCount(prevCount => prevCount + 1)
  }

  useEffect(() => {
    console.log("Ooh: ", data, error)
  }, [data, error])

  return (
    <>
      <h1>Users Page</h1>
      <p>Count: {count}</p>
      <button onClick={onClick}>Increment</button>
    </>
  )
}
