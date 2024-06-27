import { getRandomEmoji } from "../funEmojis";
import useGetConversations from "../hooks/useGetConversations";
import SingleConversation from "./SingleConversation";

const Conversations = () => {
  const { loading, conversations }: any = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation: any, ind: number) => (
        <SingleConversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji(ind)}
          lastInd={ind === conversations.length - 1}
        />
      ))}
      {loading ? <span className="loading loading-spinner mx-auto" /> : null}
    </div>
  );
};
export default Conversations;
