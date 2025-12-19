import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import blogReducer from "../features/blogs/blogSlice"
import themeReducer from "../features/theme/themeSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        blogs: blogReducer,
        theme: themeReducer,
    },
});