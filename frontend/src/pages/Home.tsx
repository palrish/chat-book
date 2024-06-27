import MessageContainer from "../components/MessageContainer";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-stone-200">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;
