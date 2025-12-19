import { createSlice } from "@reduxjs/toolkit";
import { fetchBlogsThunk, fetchBlogByIdThunk } from "./blogThunks";

const blogSlice = createSlice({
    name: "blogs",
    initialState: {
        list: [],
        selectedBlog: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {builder
        .addCase(fetchBlogsThunk.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchBlogsThunk.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
        })
        .addCase(fetchBlogsThunk.rejected, (state) => {
            state.loading = false;
        })

        .addCase(fetchBlogByIdThunk.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchBlogByIdThunk.fulfilled, (state, action) => {
            state.selectedBlog = action.payload;
            state.loading = false;
        })
        .addCase(fetchBlogByIdThunk.rejected, (state) => {
            state.loading = false;
        })
    }
});

export default blogSlice.reducer;