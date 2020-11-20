import {createSlice} from "@reduxjs/toolkit"

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        sidebarShow: false
    },
    reducers:{
        setSidebar: (state,action) => {
            state.sidebarShow = action.payload.sidebarShow;
        },
    },
});

export const {setSidebar} = sidebarSlice.actions;

export const selectSidebar = (state) => state.sidebar.sidebarShow;

export default sidebarSlice.reducer;