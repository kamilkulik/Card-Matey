import useIgnoreMountEffect from "./useIgnoreMountEffect"

const useInMotion = (setHook, timeout, deps) => {
  useIgnoreMountEffect(() => {
    setHook(true)
    const motionTimer = setTimeout(() => setHook(false), timeout)
    return () => clearTimeout(motionTimer)
  }, deps)
}

export default useInMotion
