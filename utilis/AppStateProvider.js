import React from 'react'
import { createContext, useState, useContext } from 'react'

const AppStateContext = createContext()
export const AppStateProvider = ({children}) => {
  
  const [cartLength, setCartLength] = useState(0)

  return (
    <AppStateContext.Provider value={{cartLength, setCartLength} }>
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppStateContext = () => useContext(AppStateContext)