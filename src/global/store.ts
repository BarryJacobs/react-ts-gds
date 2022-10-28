import { proxy } from "valtio"
import { v4 as uuidv4 } from "uuid"

interface Store {
  bearerToken: string
}

const store = proxy<Store>({
  bearerToken: uuidv4()
})

export default store
