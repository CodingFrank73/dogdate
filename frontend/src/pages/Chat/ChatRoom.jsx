import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client"

import HeaderChatRoom from "../../components/Header/HeaderChatRoom";
import apiBaseUrl from "../../api";

import "./Chat.css"

const socket = io.connect(apiBaseUrl)

const ChatRoom = (props) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const location = useLocation();
  const { dogName, chatID, profileImage } = location.state;

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {  //data object sent to backend
        room: chatID,
        author: dogName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData])
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.emit("join_room", chatID)
  }, [])

  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div>
      <div className="profile">
        <HeaderChatRoom profileImage={profileImage} dogName={dogName} />

        <div className="chat-window">
          <div style={{ color: "grey" }}></div>
          <div className="chat-body">
            <ScrollToBottom className="message-container">
              {messageList.map((messageContent, i) => {
                return (
                  <div key={i}
                    className="message"
                    id={dogName === messageContent.author ? "you" : "other"}
                  >
                    <div>
                      <div className="message-content" style={{ margin: "0" }}>
                        <p>{messageContent.message}</p>
                      </div>
                      <div className="message-meta">
                        <p id="time" style={{ fontSize: ".7rem" }}>{messageContent.time}</p>
                        <p id="author" style={{ color: "grey" }}>{messageContent.author}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
          </div>

          <div className="chat-footer">
            <input
              type="text"
              value={currentMessage}
              placeholder="Hey..."
              onChange={(e) => { setCurrentMessage(e.target.value); }}
              onKeyPress={(event) => { event.key === "Enter" && sendMessage(); }}
            />
            <button onClick={sendMessage}>&#9658;</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom;