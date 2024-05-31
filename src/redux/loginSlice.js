import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";

const initialState = {
  userID: "",
  userName: "",
  email: "",
  token: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state, action) {
      const { userID, userName, email, token } = action.payload;
      state.userID = userID;
      state.userName = userName;
      state.email = email;
      state.token = token;
    },
    logout(state) {
      state.userID = "";
      state.userName = "";
      state.email = "";
      state.token = "";
    },
    update(state, action) {
      const { userName } = action.payload;
      state.userName = userName;
    },
  },
});

export const { login, logout, update } = loginSlice.actions;

export const userID = (state) => state.login.userID;
export const userName = (state) => state.login.userName;
export const userEmail = (state) => state.login.email;
export const authToken = (state) => state.login.token;

export default loginSlice.reducer;
