import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserValue = (newUser) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, setUserValue }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
