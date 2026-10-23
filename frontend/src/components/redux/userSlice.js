import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            localStorage.removeItem("role");
        },
    },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;