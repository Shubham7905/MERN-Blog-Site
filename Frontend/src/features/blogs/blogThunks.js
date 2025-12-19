import { createAsyncThunk } from "@reduxjs/toolkit";
import {fetchBlogs, fetchBlogById} from "../../api/blogApi"

export const fetchBlogsThunk = createAsyncThunk(
    "blogs/fetchAll",
    async () => {
        const res = await fetchBlogs();
        return res.data.data;
    }
);

export const fetchBlogByIdThunk = createAsyncThunk(
    "blogs/fetchOne", 
    async (id) => {
        const res = await fetchBlogById(id);
        return res.data.data;
    }
)