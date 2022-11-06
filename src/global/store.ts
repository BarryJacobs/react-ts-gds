import { proxy } from "valtio"
import { v4 as uuidv4 } from "uuid"
import { devtools } from "valtio/utils"

interface Store {
  bearerToken: string
}

const store = proxy<Store>({
  bearerToken: uuidv4()
})

devtools(store)

export default store
