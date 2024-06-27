import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";

const MessageContainer = () => {
  const { selectedConvoId, setSelectedConvoId }: any = useAuthContext();
  useEffect(() => {
    return () => setSelectedConvoId(null);
  }, [setSelectedConvoId]);
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConvoId ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-stone-300	 px-4 py-2 mb-2">
            <span className="label-text">To:</span>
            <span className="text-neutral-600 font-bold">
              {" "}
              {selectedConvoId.fullName}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser }: any = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl  text-neutral-400 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessageContainer;
