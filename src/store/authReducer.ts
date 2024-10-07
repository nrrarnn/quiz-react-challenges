import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState { 
  token: string | null;
  username: string | null;
  userEmail : string | null;
}

const token: string | null = localStorage.getItem("token");
const username: string | null = localStorage.getItem("username");
const userEmail: string | null = localStorage.getItem("email");

const initialState: AuthState = {
  token: token,
  username: username,
  userEmail: userEmail,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string; username: string ; userEmail: string }>) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.userEmail = action.payload.userEmail;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.userEmail = null;
    },
  },
});

export const { setAuth, logout } = authReducer.actions;
export default authReducer.reducer;