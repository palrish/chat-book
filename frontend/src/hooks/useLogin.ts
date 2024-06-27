import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser }: any = useAuthContext();
  const login = async ({ username, password }: any) => {
    const success = handleInputErrors({ username, password });
    if (!success) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://chatbook-pal.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials:"include"
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

const handleInputErrors = ({ username, password }: any) => {
  if (!username || !password) {
    toast.error("Enter all the details.");
    return false;
  }
  return true;
};

export default useLogin;
