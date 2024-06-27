import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import useGetConversations from "../hooks/useGetConversations";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConvoId }: any = useAuthContext();
  const { conversations }: any = useGetConversations();
  const submitHandler = (e: any) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3)
      return toast.error("Search length must be atleast 3 characters long.");
    const conversation = conversations.find((c: any) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConvoId(conversation);
      setSearch("");
    } else {
      toast.error("No such user found!");
    }
  };
  return (
    <form className="flex items-center gap-2 p-2" onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle text-black">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
