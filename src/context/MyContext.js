"use client";

import { createContext, useContext, useState } from 'react';



const MyContext = createContext();


export const MyProvider = ({ children }) => {
  const [state, setState] = useState({}); // Initialize your state here

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
