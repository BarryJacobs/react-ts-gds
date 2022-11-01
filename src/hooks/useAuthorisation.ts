import { useMemo } from "react"
import { JsonHeaders } from "global/constants"
import { AuthorisationHeaders } from "types"
import { useSnapshot } from "valtio"
import store from "global/store"

const useAuthorisation = () => {
  const { bearerToken } = useSnapshot(store)
  const jsonHeaders: AuthorisationHeaders = useMemo(
    () =>
      Object.assign(
        {
          Authorization: "Bearer " + bearerToken
        },
        { ...JsonHeaders }
      ),
    [bearerToken]
  )
  return { jsonHeaders }
}

export default useAuthorisation
