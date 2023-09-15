import { useRef } from "react"

const useForceUpdate = () => {
  const toggle = useRef(true)

  const forceUpdate = () => {
    toggle.current = !toggle.current
  }

  return forceUpdate
}

export default useForceUpdate
