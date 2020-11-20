import { Avatar, IconButton } from '@material-ui/core'
import  RateReviewOutlinedIcon  from '@material-ui/icons/RateReviewOutlined'
import SearchIcon  from '@material-ui/icons/Search'
import React, {useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import './Sidebar.css'
import db, {auth} from '../../firebase'
import SidebarChat from '../SidebarChat/SidebarChat'
import { selectSidebar } from '../../features/sidebarSlice'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { setSidebar } from '../../features/sidebarSlice'
import { useDispatch } from 'react-redux'

function Sidebar (){
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const [chats,setChats] = useState([])
    const sidebarShow = useSelector(selectSidebar)
    
    useEffect(() => {
        db.collection('chats').onSnapshot((snapshot) => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
    },[])

    const addChat = () => {
        const chatName = prompt("Please enter a chat room name ")
        const chatDesc = prompt("Please enter chat room description")
        if(chatName){
            db.collection('chats').add({
                chatName: chatName,
                description: chatDesc
            })
        }
    }

    console.log(sidebarShow);

    return (
      
        <div className={`sidebar ${sidebarShow === true && "sidebar__show"}`}>
            <div className = "sidebar__header">
                <Avatar src={user.photo} onClick={() => auth.signOut() } className = "sidebar__avatar"/>
                <div className = "sidebar__input">
                    <SearchIcon />
                    <input placeholder = "Search" />
                </div>
                <IconButton className = "sidebar__inputButton" variant="outlines" onClick = {addChat}>
                    <RateReviewOutlinedIcon />
                </IconButton>
                <IconButton className = "sidebar__closeButton" variant="outlines" 
                    onClick={() => 
                        dispatch(
                            setSidebar({
                                sidebarShow: false,
                            }),
                        )
                    } 
                >
                    <ArrowBackIosIcon/>
                </IconButton>

            </div>
            <div className = "sidebar__chats">
                {chats.map(({id ,data:{chatName,description}}) => (
                    
                    <SidebarChat key = {id} id={id} chatName = {chatName} description = {description}/>
                ))}
                
            </div>
        </div>
    )
}
 
export default Sidebar
