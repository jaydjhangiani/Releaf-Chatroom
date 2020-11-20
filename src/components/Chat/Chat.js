import { IconButton } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send'
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Chat.css";
import { selectChatId, selectChatName ,selectChatDescription} from "../../features/chatSlice";
import db from "../../firebase";
import Message from "../Message/Message";
import firebase from "firebase";
import { selectUser } from "../../features/userSlice";
import { selectSidebar } from '../../features/sidebarSlice'
import FlipMove from "react-flip-move";
import Welcome from "../Welcome/Welcome";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { setSidebar } from "../../features/sidebarSlice";
import { useDispatch } from 'react-redux'


function Chat() {
  const user = useSelector(selectUser);
  const chatDescription = useSelector(selectChatDescription);
  const [input, setInput] = useState("");
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [messages, setMessages] = useState([]);
  const sidebarShow = useSelector(selectSidebar)
  const dispatch = useDispatch();

//console.log(chatDescription)


  useEffect(() => {
    if (chatId) {
     
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);

  

  const sendMessage = (e) => {
    e.preventDefault();
    if(input === ""){
      alert("Enter Message")
    }
    else{
      db.collection("chats").doc(chatId).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName,
      });
    }
    

    setInput("");
  };

  
  //console.log(modal)
  const showModal = () => {
    let  modal = document.getElementById("myModal");
    modal.style.display = "block";
  }

  const closeModal = () => {
    let  modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  console.log(sidebarShow)


  return (
   (!chatId) ? (

    // Header for welcome 

    <div>
      <div className= {`chat__header ${sidebarShow === true && "chat__hide"}`}>
      <IconButton className = "chat__more" onClick={() => 
            dispatch(
                setSidebar({
                    sidebarShow: true,
                })
            )
        } >
          <MoreVertIcon />
      </IconButton>
      <div className="chat__welcomeHeaderContainer">
      <h4>
          Welcome to Releaf
        </h4>
      </div>
      </div>
      <Welcome /> 
   </div>)
   
   
   : (

    // chat code

    

    <div className={`chat ${sidebarShow === true && "chat__hide"}`}>
      <div className="chat__modal" id="myModal">
        <div className="chat__modalContent">
          <span onClick={closeModal} className="chat__modalClose">&times;</span>
            <h2>Welcome to Releaf Chat Room</h2>
            <br/>
            Chat Room Name: <strong>{chatName}</strong>
            <br/><br/>
            <p>{chatDescription}</p>
            <br/>
            <strong>Rules and Regulations:</strong>
              <p>1. No spamming</p>
              <p>2. No personal attacks or harrasment</p>
              <p>3. No solicitation</p>
        </div>
    </div>
      <div className="chat__header">
      <IconButton className = "chat__more" onClick={() => 
            dispatch(
                setSidebar({
                    sidebarShow: true,
                })
            )
        } >
          <MoreVertIcon />
      </IconButton>
      <div className="chat__headerContainer">
      <h4>
          To: <span className="chat__name">{chatName}</span>
        </h4>
        <strong onClick={showModal} className="chat__details">Details</strong>
      </div>
      </div>
      
      <div className="chat__message">
        <FlipMove>
            {messages.map(({ id, data }) => (
              <Message key={id} contents={data} />
            ))}
          </FlipMove>
      </div>
      
      <div className="chat__input">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your message."
            type="text"
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>

        <IconButton onClick={sendMessage}>
          <SendIcon  className="chat__mic" />
        </IconButton>
      </div>
      
    </div>)
  );
}


export default Chat;