import { Link } from "react-router-dom";
import GenderCheckbox from "../utils/GenderCheckbox";
import { useState } from "react";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleGenderCheckbox = (gender: any) => {
    setInput({ ...input, gender });
  };

  const { signup, loading } = useSignup();

  const submitHandler = (e: any) => {
    e.preventDefault();
    signup({ ...input });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounder-lg shadow-md bg-stone-200">
        <h1 className="text-3xl font-semibold text-center text-stone-500">
          Chat
          <span className="text-stone-600">book</span>
        </h1>
        <form onSubmit={submitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base text-neutral-600 label-text">
                Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full input input-bordered h-10"
              value={input.fullName}
              onChange={(e) => setInput({ ...input, fullName: e.target.value })}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base text-neutral-600 label-text">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base text-neutral-600 label-text">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base text-neutral-600 label-text">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter confirm password"
              className="w-full input input-bordered h-10"
              value={input.confirmPassword}
              onChange={(e) =>
                setInput({ ...input, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handleGenderCheckbox}
            selectedGender={input.gender}
          />

          <Link
            to="/login"
            className="text-sm hover:underline text-black hover:text-blue-600 mt-2 inline-block"
          >
            already have an account?
          </Link>

          <div>
            <button
              disabled={loading}
              className="btn btn-block btn-sm mt-2 text-lg text-neutral-600 label-text"
            >
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                "Signup"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
