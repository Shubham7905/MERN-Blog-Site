import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks.js"
import Loader from "./Loader.jsx";

export default function ProtectedRoutes({ children }) {
    const { user, loading } = useAppSelector((state) => state.auth);

    if (loading) return <Loader />

    return user ? children : <Navigate to="/login" replace />
}