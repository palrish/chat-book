import { useAuthContext } from "../context/AuthContext";
import { extractTime } from "../utils/extractTime";

const Message = ({ message }: any) => {
  const { authUser, selectedConvoId }: any = useAuthContext();
  const fromMe = message.sender === authUser._id;
  const chatClass = fromMe ? "chat-end" : "chat-start";
  const time = extractTime(message.createdAt);
  const pfp = fromMe ? authUser.profilePic : selectedConvoId?.profilePic;
  const bubbleColor = fromMe ? "bg-blue-500" : "";
  return (
    <div className={`chat ${chatClass}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="tailwind CSS chat bubble component" src={pfp} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleColor}`}>
        {message.message}
      </div>
      <div className={"chat-footer opacity-50 text-xs flex gap-1 items-center"}>
        {time}
      </div>
    </div>
  );
};
export default Message;
