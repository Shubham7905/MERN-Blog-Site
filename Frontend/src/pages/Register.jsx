import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { registerThunk } from "../features/auth/authThunks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import RegisterSvg from "../assets/register.svg"; 
export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.info("Registering...");

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("avatar", avatar);
    if (coverImage) formData.append("coverImage", coverImage);

    try {
      await dispatch(registerThunk(formData)).unwrap();
      toast.success("User registered successfully!");
      navigate("/", { replace: true });
    } catch {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="h-[calc(100vh-72px)] flex items-center justify-center bg-linear-to-br from-purple-200 to-indigo-200 dark:from-gray-900 dark:to-[#1e2a43] px-4">

      {/* Card */}
      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-[#1e2a43]">

        {/* LEFT : FORM */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h1 className="text-3xl font-bold mb-6 text-center md:text-left text-gray-800 dark:text-white">
            Create Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder="Full Name"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-[#1e2a43] dark:text-white placeholder-gray-400"
              value={data.fullName}
              onChange={(e) =>
                setData({ ...data, fullName: e.target.value })
              }
            />

            <input
              placeholder="Email"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-[#1e2a43] dark:text-white placeholder-gray-400"
              value={data.email}
              onChange={(e) =>
                setData({ ...data, email: e.target.value })
              }
            />

            <input
              placeholder="Username"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-[#1e2a43] dark:text-white placeholder-gray-400"
              value={data.username}
              onChange={(e) =>
                setData({ ...data, username: e.target.value })
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

            <div>
              <label className="text-sm font-medium">Avatar</label>
              <input
                type="file"
                onChange={(e) => setAvatar(e.target.files[0])}
                className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Cover Image (optional)
              </label>
              <input
                type="file"
                onChange={(e) => setCoverImage(e.target.files[0])}
                className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button className="w-full py-3 rounded-lg bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold shadow hover:opacity-90 transition">
              Register
            </button>
          </form>
        </div>

        {/* RIGHT : SVG */}
        <div className="hidden md:flex w-1/2 bg-linear-to-br from-purple-600 to-indigo-600 items-center justify-center p-10">
          <img
            src={RegisterSvg}
            alt="Register illustration"
            className="max-w-full h-auto"
          />
        </div>

      </div>
    </div>
  );
}
