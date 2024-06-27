import { useEffect, useRef } from "react";
import useGetMessages from "../hooks/useGetMessages";
import Message from "./Message";
import useListenMessages from "../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const lastMessageRef = useRef<HTMLInputElement>(null);
  useListenMessages();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && <span className="loading loading-spinner" />}
      {!loading &&
        messages.map((message: any) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start a conversation.</p>
      )}
    </div>
  );
};

export default Messages;
