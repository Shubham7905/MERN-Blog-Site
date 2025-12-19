import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk, logoutThunk, loadUserThunk } from "./authThunks";

const authSlice = createSlice({
    name: "auth",
    initialState: {user: null, loading: true},
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => { builder
        .addCase(loginThunk.pending, (state) => {
            state.loading = true;
        })
        .addCase(loginThunk.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        })
        .addCase(loginThunk.rejected, (state) => {
            state.user = null;
            state.loading = false;
        })

        .addCase(registerThunk.pending, (state) => {
            state.loading = true;
        })
        .addCase(registerThunk.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        })
        .addCase(registerThunk.rejected, (state) => {
            state.user = null;
            state.loading = false;
        })

        .addCase(logoutThunk.fulfilled, (state) => {
            state.user = null;
            state.loading = false;
        })

        .addCase(loadUserThunk.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadUserThunk.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        })
        .addCase(loadUserThunk.rejected, (state) => {
            state.user = null;
            state.loading = false;
        })
    }
});

export const {setUser} = authSlice.actions;

export default authSlice.reducer;