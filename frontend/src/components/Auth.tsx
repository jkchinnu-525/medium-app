import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SignupInput } from "@mediumapp/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setpostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });
  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert("Cannot get data");
    }
  }
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div>
            <div className="text-3xl font-extrabold">Create an Account</div>
            <div className="text-slate-400">
              {type === "signin"
                ? "Don't Have an Account? "
                : "Already Have an Account?"}
              <Link
                className="underline pl-2"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          <div>
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Jake Paul.."
                onChange={(e) => {
                  setpostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              ></LabelledInput>
            ) : null}
            <LabelledInput
              label="Username"
              placeholder="JakePaul@gmail.com"
              onChange={(e) => {
                setpostInputs({
                  ...postInputs,
                  username: e.target.value,
                });
              }}
            ></LabelledInput>
            <LabelledInput
              label="Password"
              placeholder="Enter your password(min 6 digits)"
              type={"password"}
              onChange={(e) => {
                setpostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            ></LabelledInput>
          </div>
          <div>
            <button
              onClick={sendRequest}
              type="button"
              className="w-full mt-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 fonnt-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
interface LaabelleInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LaabelleInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-black pt-2">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
