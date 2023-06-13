import { createSlice } from "@reduxjs/toolkit";
import socket from "@/Components/socket/create_socket";

const initialStateSocket = {
    socket: socket,
};

const socketSlice = createSlice({
    name: "socket",
    initialState: initialStateSocket,
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload;
        }
    },
});

export {
    socketSlice
}