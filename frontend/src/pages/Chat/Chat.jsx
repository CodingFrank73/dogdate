import io from "socket.io-client"
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import "./Chat.css"
import ChatRoom from "./ChatRoom";




//  BILDER-IMPORT

import ddLogo from '../../assets/icons/logo.svg';
import filter from '../../assets/icons/filter.svg';
import buttonDislike from '../../assets/icons/dislike-white.svg';
import buttonLike from '../../assets/icons/like-white.svg';
import backarrow from '../../assets/icons/arrow-back.svg';
import iconHome from '../../assets/icons/home.svg';
import iconLike from '../../assets/icons/like.svg';
import iconChataktiv from '../../assets/icons/chat-aktiv.svg';
import iconProfile from '../../assets/icons/profile.svg';
import kissJimmy from '../../assets/img/kiss-jimmy-the-bull.gif';

import apiBaseUrl from "../../api";


//const socket = io.connect("http://localhost:9000")
const socket = io.connect(apiBaseUrl)

const Chat = (props) => {

    const [username, setUsername] = useState("")
    const [room, setRoom] = useState("")
    const [showChat, setShowChat] = useState(false)



    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room)
            ///this will be submitted to backend as data
            setShowChat(true)
        }

    }



    return (
        <div>

            <div className="profile">
                <div className="profile-header">
                    <Link to={-1}><img className="profile-arrow-back" src={backarrow} alt="back" /></Link>
                    <h2>Live-Chat</h2>
                </div>


                <div className="chatLogin">
                    {!showChat ? (
                        <div>
                            <div className="chatImg"><img src={kissJimmy} alt="Kiss Kiss Kiss" /></div>
                            <h4>Join Chat</h4>
                            <div className="chatInput">
                                <input type="text" className="chatInput"
                                    placeholder="Your Name"
                                    onChange={(event) => (setUsername(event.target.value))} />
                            </div>

                            <div>
                                <input type="text"
                                    placeholder='Room ID'
                                    onChange={(event) => (setRoom(event.target.value))} />
                            </div>
                            <div>
                                <button className="chatButton"
                                    onClick={joinRoom}>Join a Chat</button>
                            </div>
                        </div>
                    )
                        : (
                            <ChatRoom socket={socket} username={username} room={room} />
                        )}
                </div>


                <footer>
                    <div className="nav">
                        <div><Link to="/home" ><img src={iconHome} alt="home" /></Link></div>
                        <div><Link to="/like" ><img src={iconLike} alt="like" /></Link></div>
                        <div><Link to="/chat" ><img src={iconChataktiv} alt="chat" /></Link></div>
                        <div><Link to="/profile" ><img src={iconProfile} alt="profile" /></Link></div>
                    </div>
                </footer>
            </div>


        </div>

    );
}

export default Chat;