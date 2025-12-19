import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, logout, currentUser } from "../../api/authApi"

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (data) => {
        const res = await login(data);
        return res.data.data.user;
    }
);

export const registerThunk = createAsyncThunk(
    "auth/register",
    async (data) => {
        const res = await register(data);
        return res.data.data.user;
    }
);

export const logoutThunk = createAsyncThunk(
    "auth/logout", 
    async () => {
        await logout();
    }
);

export const loadUserThunk = createAsyncThunk(
    "auth/loadUser", 
    async () => {
        const res = await currentUser();
        return res.data.data.user;
    }
);