import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser }: any = useAuthContext();

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }: any) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch("https://chatbook-pal.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
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
  return { signup, loading };
};

const handleInputErrors = ({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}: any) => {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Enter all the details.");
    return false;
  }
  if (username.length < 3) {
    toast.error("Username must be atleast 3 characters long.");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords doesn't match.");
    return false;
  }
  return true;
};

export default useSignup;
