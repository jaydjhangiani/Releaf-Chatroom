import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatId: null,
    chatName: null,
    chatDescription: null
  },
  reducers: {
    setChat: (state, action) => {
    state.chatId = action.payload.chatId;
      state.chatName = action.payload.chatName;
      state.chatDescription = action.payload.chatDescription;
    },
  },
});


export const { setChat } = chatSlice.actions;

export const selectChatName = (state) => state.chat.chatName;
export const selectChatDescription = (state) => state.chat.chatDescription;
export const selectChatId = (state) => state.chat.chatId;

export default chatSlice.reducer;