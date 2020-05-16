import React, { createContext, useState } from "react"

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [currentUserEmail, setCurrentUserEmail] = useState()

  return (
    <AppContext.Provider value={{ currentUserEmail, setCurrentUserEmail }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
