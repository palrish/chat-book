import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConvoId }: any = useAuthContext();
  useEffect(() => {
    setLoading(true);
    const getMessages = async () => {
      try {
        const res = await fetch(
          `https://chatbook-pal.onrender.com/api/messages/${selectedConvoId._id}`,
          {
            method: "GET",
            headers: { "Content-type": "application/json" },
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConvoId?._id) getMessages();
  }, [selectedConvoId?._id, setMessages]);

  return { loading, messages};
};

export default useGetMessages;
