import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [curentUserEmail, setCurentUserEmail] = useState();

  return (
    <AppContext.Provider value={{curentUserEmail, setCurentUserEmail}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
