import { useState, useEffect } from 'react';
import { useTypedSelector } from './useTypedSelector';
import getTime from 'date-fns/getTime';
import isValid from 'date-fns/isValid';

export const checkTimestampAge = (stamp: number) => {
  if (!isValid(stamp)) return false;
  const now = getTime(Date.now());
  const interval = now - getTime(stamp);
  const allowedUidAge = 20 * 60000; // minutes * miliseconds
  return interval < allowedUidAge;
};

const useVerifyTimestamp = () => {
  const authTimestamp = useTypedSelector((state) => state.auth.timestamp as number);
  const [valid, setValid] = useState(checkTimestampAge(authTimestamp));

  useEffect(() => {
    if (isValid(authTimestamp)) {
      if (checkTimestampAge(authTimestamp)) setValid(true);
    }
  }, [authTimestamp]);
  return valid;
};

export default useVerifyTimestamp;
