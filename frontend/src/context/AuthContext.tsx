import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: any) => {
  const localValue = localStorage.getItem("chat-user");
  const [authUser, setAuthUser] = useState<any>(localValue ? JSON.parse(localValue) : null);
  const [selectedConvoId, setSelectedConvoId] = useState(null);
  const [messages, setMessages] = useState([]);
  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        selectedConvoId,
        setSelectedConvoId,
        messages,
        setMessages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
