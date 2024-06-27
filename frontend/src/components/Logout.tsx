import { BiLogOut } from "react-icons/bi";
import useLogout from "../hooks/useLogout";

const Logout = () => {
  const { logout, loading } = useLogout();
  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-black cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner" />
      )}
    </div>
  );
};
export default Logout;
