import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import chatReducer from "../features/chatSlice";
import sidebarReducer from "../features/sidebarSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    sidebar: sidebarReducer,
  },
});