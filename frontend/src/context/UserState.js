import React, { useState } from "react";
import { UserContext } from "./UserContext";

const UserState = ({ children }) => {
  const [user, setUser] = useState({ user: "", isAuthenticated: false });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
