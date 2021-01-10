import React, { useState, useEffect, createContext, useContext } from 'react'

const params = {
  client_id: process.env.REACT_APP_GOOGLE_CLIENT_IN,
}

const authContext = createContext()

export function provideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}