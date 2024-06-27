import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    login({ username, password });
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounder-lg shadow-md bg-stone-200">
        <h1 className="text-3xl font-semibold text-center text-stone-500">
          Chat
          <span className="text-stone-600">book</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="label-text text-lg text-neutral-600">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e: any) => setUsername(e.target.value)}
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-lg text-neutral-600 label-text">
                Password
              </span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <Link
            to="/signup"
            className="text-sm hover:underline text-black hover:text-blue-600 mt-2 inline-block"
          >
            Don't have an account?
          </Link>
          <div>
            <button
              disabled={loading}
              className="btn btn-block btn-sm mt-2 text-lg text-neutral-600 label-text"
            >
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
