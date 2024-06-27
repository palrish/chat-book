import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser }: any = useAuthContext();
  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://chatbook-pal.onrender.com/api/auth/logout", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data);
      }
      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { logout, loading };
};

export default useLogout;
