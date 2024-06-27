import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

export const socketContext = createContext({});

export const useSocketContext = () => useContext(socketContext);

export const SocketContextProvider = ({ children }: any) => {
  const [socket, setSocket] = useState<any>(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const { authUser }: any = useAuthContext();

  useEffect((): any => {
    if (authUser) {
      console.log(authUser);
      const socket = io("http://localhost:5000", {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUser(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </socketContext.Provider>
  );
};
