import React, { useEffect, useState } from "react"

const UserContext = React.createContext();

function RunnerProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(false)

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, RunnerProvider };