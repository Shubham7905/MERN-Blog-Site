import { Link, replace } from "react-router-dom";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { logoutThunk } from "../features/auth/authThunks"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toggleTheme } from "../features/theme/themeSlice"

export default function Navbar() {
    const {user, loading} = useAppSelector((state) => state.auth);
    const theme = useAppSelector((state) => state.theme.mode);
    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await dispatch(logoutThunk()).unwrap();
            toast.success("Logged out successfully!!")
            navigate("/", { replace: true })
        } catch (error) {
            toast.error("Failed to logout")
        }
    }

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

                {/* LOGO */}
                <Link
                    to="/"
                    className="text-2xl font-extrabold bg-linear-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text"
                >
                    DevBlogs
                </Link>

                <div className="flex items-center gap-4">
                    {/* Theme Button */}
                    <button 
                        onClick={() => dispatch(toggleTheme())}
                        className="p-2 rounded-full transition hover:bg-gray-200 dark:hover:bg-gray-700"
                        title="Toggle Theme"
                    >
                        {theme === "light" ? (<i className="ri-moon-line text-xl"></i>
                        ) : (
                            <i className="ri-sun-line text-xl text-yellow-400"></i>
                        )}
                    </button>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            to="/"
                            className="hover:text-purple-600 dark:hover:text-purple-400"
                        >
                            Home
                        </Link>

                        {!loading && (
                            user ? (
                                <>
                                <Link
                                    to="/create-blog"
                                    className="hover:text-purple-600 dark:hover:text-purple-400"
                                >
                                    Create
                                </Link>
                                <Link
                                    to="/profile"
                                    className="hover:text-purple-600 dark:hover:text-purple-400"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="hover:text-red-500 transition"
                                >
                                    Logout
                                </button>
                                </>
                            ) : (
                                <>
                                <Link
                                    to="/login"
                                    className="hover:text-purple-600 dark:hover:text-purple-400"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="hover:text-purple-600 dark:hover:text-purple-400"
                                >
                                    Register
                                </Link>
                                </>
                            )
                        )}
                    </div>

                    {/* Hamburger */}
                    <button
                        className="md:hidden"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <i className="ri-close-line text-2xl"></i>
                        ) : (
                            <i className="ri-menu-line text-2xl"></i> 
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {open && !loading && (
                <div className="md:hidden px-4 pb-4 space-y-3">
                    <Link
                        to="/"
                        className="block"
                        onClick={() => setOpen(false)}
                    >
                        Home
                    </Link>

                    {user ? (
                        <>
                        <Link
                            to="/create-blog"
                            className="block"
                            onClick={() => setOpen(false)}
                        >
                            Create
                        </Link>
                        <Link
                            to="/profile"
                            className="block"
                            onClick={() => setOpen(false)}
                        >
                            Profile
                        </Link>
                        <button
                            onClick={() => {
                                handleLogout();
                                setOpen(false);
                            }}
                            className="text-red-500 font-medium"
                        >
                            Logout
                        </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="block"
                                onClick={() => setOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="block"
                                onClick={() => setOpen(false)}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            )}

        </nav>
    )
}