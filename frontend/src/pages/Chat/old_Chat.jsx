import io from "socket.io-client"
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import "./Chat.css"
import ChatRoom from "./ChatRoom";

import Footer from "../../components/Footer/Footer";


//  BILDER-IMPORT


import backarrow from '../../assets/icons/arrow-back.svg';
import kissJimmy from '../../assets/img/kiss-jimmy-the-bull.gif';

import apiBaseUrl from "../../api";


//const socket = io.connect("http://localhost:9000")
const socket = io.connect(apiBaseUrl)


const old_Chat = (props) => {

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
                    <Footer />
                </footer>
            </div>


        </div>

    );
}

export default old_Chat;