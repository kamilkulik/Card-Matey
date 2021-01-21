import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import getTime from 'date-fns/getTime'
import isValid from 'date-fns/isValid'

export const checkTimestampAge = (stamp) => {
  const now = getTime(Date.now())
  const interval = now - getTime(stamp)
  const allowedUidAge = 0.1 * 60000 // minutes * miliseconds
  return interval < allowedUidAge
}

const useVerifyTimestamp = () => {
  const authTimestamp = useSelector((state) => state.auth?.timestamp)
  const [valid, setValid] = useState(checkTimestampAge(authTimestamp))

  useEffect(() => {
    if (isValid(authTimestamp)) {
      if (checkTimestampAge(authTimestamp)) setValid(true)
    }
  }, [authTimestamp])

  return valid
}

export default useVerifyTimestamp
