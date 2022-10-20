import { useState } from "react"
import { useNavigate } from "react-router-dom";

// import io from "socket.io-client"
// import ChatRoom from "./ChatRoom";
// import apiBaseUrl from "../../api";

import "./Chat.css"

//const socket = io.connect("http://localhost:9000")
// const socket = io.connect(apiBaseUrl)

const ChatList = ({ chatsArr, currentUsername }) => {

    const [username, setUsername] = useState("")
    const [room, setRoom] = useState("")
    const [profileImage, setProfileImage] = useState("");
    // const [showChat, setShowChat] = useState(false)

    const navigate = useNavigate();

    ///this will be submitted to backend as data
    // const joinRoom = () => {
    //     if (username !== "" && room !== "") {
    //         socket.emit("join_room", room)
    //         setShowChat(true)
    //         navigate('/room', { state: { dogName: username, chatID: room, profileImage: profileImage } })
    //         { state: { userName: username, room: room, socket: socket } })
    //     }
    // }


    const openChat = (item) => {
        setUsername(currentUsername);
        setRoom(item.chatID);
        setProfileImage(item.profileImage);
        // joinRoom();
        navigate('/room', { state: { dogName: username, chatID: room, profileImage: profileImage } })
    }

    return (
        <div className="chatList">
            <ul>
                {chatsArr && (chatsArr.map((item, i) => (
                    <li className="chatList-Item" key={item.chatID} onClick={(e) => openChat(item)} >
                        {/* <li className="chatList-Item"> */}
                        {/* <Link to="/room" state={{ chatDetails: item }}> */}
                        <img src={item.profileImage} alt="profileImage" />
                        <div className="left">
                            <p>{item.dogName}</p>
                            <p>{item.chatID}</p>
                        </div>
                        {/* </Link> */}
                    </li>


                )))}
            </ul>

            {/* <div className="chatLogin">
                {!showChat ? (
                    <div>
                        <ul>
                            {chatsArr && (chatsArr.map((item, i) => (
                                <li className="chatList-Item" onClick={(e) => openChat(item.chatID)} key={item.chatID}>
                                    <img src={item.profileImage} alt="profileImage" />
                                    <div className="left">
                                        <p>{item.dogName}</p>
                                        <p>{item.chatID}</p>
                                    </div>
                                </li>
                            )))}
                        </ul>
                    </div>
                )
                    : (
                        <ChatRoom socket={socket} username={currentUsername} room={room} />
                    )}
            </div> */}

        </div>
    );
}

export default ChatList;