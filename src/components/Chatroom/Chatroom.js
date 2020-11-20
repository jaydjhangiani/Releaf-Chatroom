import React from 'react'
import './Chatroom.css'
import Sidebar from '../Sidebar/Sidebar'
import Chat from '../Chat/Chat'


function Chatroom() {
    return (
        <div className = "chatroom">
            <Sidebar />
            <Chat />
        </div>
    )
}

export default Chatroom
