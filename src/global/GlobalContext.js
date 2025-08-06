import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isChecked, setIsChecked] = useState(() => {
    return JSON.parse(localStorage.getItem('rememberChecked')) || false;
  });

  useEffect(() => {
    localStorage.setItem('rememberChecked', JSON.stringify(isChecked));
  }, [isChecked]);

  return (
    <GlobalContext.Provider value={{ isChecked, setIsChecked }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
