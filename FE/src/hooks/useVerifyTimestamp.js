/* eslint-disable */

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import getTime from 'date-fns/getTime'
import isValid from 'date-fns/isValid'

const useVerifyTimestamp = () => {
  const [valid, setValid] = useState(false)
  const authTimestamp = useSelector((state) => state.auth?.timestamp)

  useEffect(() => {
    if (isValid(authTimestamp)) {
      const now = getTime(Date.now())
      const interval = now - getTime(authTimestamp)
      const allowedUidAge = 20 * 60000 // minutes * miliseconds
      if (interval < allowedUidAge) { 
        // console.log('hello!')
        setValid(true)
        console.log(valid)
      }
    }
  }, [authTimestamp])
  console.log(valid)
  return valid
}

export default useVerifyTimestamp
