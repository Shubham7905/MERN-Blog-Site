import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateBlog from "../pages/CreateBlog";
import BlogDetails from "../pages/BlogDetails";
import EditBlog from "../pages/EditBlog";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ProtectedRoutes from "../components/ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/blog/:blogId" element={<BlogDetails />} />

            <Route
                path="/create-blog"
                element={
                    <ProtectedRoutes>
                        <CreateBlog />
                    </ProtectedRoutes>
                }
            />

            <Route
                path="/edit/:blogId"
                element={
                    <ProtectedRoutes>
                        <EditBlog />
                    </ProtectedRoutes>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoutes>
                        <Profile />
                    </ProtectedRoutes>
                }
            />

            <Route path="*" element={<NotFound />} />

        </Routes>
    )
}