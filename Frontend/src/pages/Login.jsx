import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { loginThunk } from "../features/auth/authThunks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import LoginSvg from "../assets/login.svg";

export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); 
    const [data, setData] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginThunk(data)).unwrap();
            toast.success("Logged in!");

            navigate("/", { replace: true });
        } catch {
            toast.error("Invalid credentials");
        }
    };

    return (
    <div className="min-h-[90vh] flex items-center justify-center bg-linear-to-br from-purple-200 to-indigo-200 dark:from-gray-900 dark:to-[#1e2a43] px-4">
      
      {/* Card */}
      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-[#1e2a43]">
        
        {/* LEFT : Illustration */}
        <div className="hidden md:flex w-1/2 bg-linear-to-br from-purple-600 to-indigo-600 items-center justify-center p-10">
          <img
            src={LoginSvg}
            alt="Login illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* RIGHT : Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
            Hello!
          </h1>
          <p className="text-gray-500 dark:text-gray-300 mb-8">
            Login to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              placeholder="Email"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-[#1e2a43] dark:text-white placeholder-gray-400"
              value={data.email}
              onChange={(e) =>
                setData({ ...data, email: e.target.value })
              }
            />

            <input
              placeholder="Password"
              type="password"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-[#1e2a43] dark:text-white placeholder-gray-400"
              value={data.password}
              onChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
            />

            <button className="w-full py-3 rounded-lg bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:opacity-90 transition">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}