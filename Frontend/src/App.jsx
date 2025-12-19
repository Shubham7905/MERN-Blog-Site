import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { loadUserThunk } from "./features/auth/authThunks";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    dispatch(loadUserThunk());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme])

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white text-black transition-all duration-300">
        <Navbar />
        <AppRoutes />
        <ToastContainer />
      </div>
    </div>
  );
}
