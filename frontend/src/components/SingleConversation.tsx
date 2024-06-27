import { useAuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext";

const SingleConversation = ({ conversation, lastInd, emoji }: any) => {
  const { selectedConvoId, setSelectedConvoId }: any = useAuthContext();
  const selected = selectedConvoId && selectedConvoId._id === conversation._id;
  const { onlineUser }: any = useSocketContext();
  const isOnline = onlineUser.includes(conversation._id);
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          selected ? "bg-sky-500" : null
        }`}
        onClick={() => {
          setSelectedConvoId(conversation);
        }}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user pfp" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-neutral-600">
              {conversation.fullName}
            </p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastInd && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default SingleConversation;
