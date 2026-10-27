import { createSlice } from "@reduxjs/toolkit";

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const clearSession = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("lastActivity");
};

// Check the saved session when the app starts
const getInitialUser = () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const lastActivity = Number(localStorage.getItem("lastActivity"));

        if (!user) {
            return null;
        }

        // Expire the session after 24 hours without activity
        if (
            lastActivity &&
            Date.now() - lastActivity >= SESSION_DURATION
        ) {
            clearSession();
            return null;
        }

        // Support existing sessions that don't have a timestamp yet
        if (!lastActivity) {
            localStorage.setItem("lastActivity", String(Date.now()));
        }

        return user;
    } catch (error) {
        clearSession();
        return null;
    }
};

const userSlice = createSlice({
    name: "user",

    initialState: {
        user: getInitialUser(),
    },

    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;

            localStorage.setItem(
                "user",
                JSON.stringify(action.payload)
            );

            // Start a fresh 24-hour session after login
            localStorage.setItem(
                "lastActivity",
                String(Date.now())
            );
        },

        updateLastActivity: (state) => {
            if (state.user) {
                localStorage.setItem(
                    "lastActivity",
                    String(Date.now())
                );
            }
        },

        logoutUser: (state) => {
            state.user = null;
            clearSession();
        },
    },
});

export const {
    setUser,
    updateLastActivity,
    logoutUser,
} = userSlice.actions;

export default userSlice.reducer;