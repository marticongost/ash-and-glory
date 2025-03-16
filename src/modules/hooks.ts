import { useCallback, useEffect } from "react"

export const useWindowEventListener = (
  eventName: string,
  handler: (event: Event) => void,
  dependencies: Array<any> = [],
  options: AddEventListenerOptions = {},
) => {
  handler = useCallback(handler, dependencies)
  useEffect(() => {
    addEventListener(eventName, handler, options)
    return () => {
      window.removeEventListener(eventName, handler, options)
    }
  }, [eventName, handler, options])
}
