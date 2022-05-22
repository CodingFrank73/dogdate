import { useState, useEffect } from "react"
import ScrollToBottom from "react-scroll-to-bottom";



const ChatRoom = ({ socket, username, room }) => {

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);


  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {  //data object sent to backend
        room: room,
        author: username,
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

//   useEffect(() => {
//       socket.on("receive_message", (data) => { //calls whenever there is a change (receives message) to the socket in backend
//         console.log(data)
//        // setMessageList((list) => [...list, data]) //returns the messages in the list and adds the current one
//         setMessageList((list) => [...list, data])
//         return (() => { 
//             setMessageList([]);
//             socket.disconnect()
//             })  ///FCK !!! kommt trotzdem zweimal an...
//       })
    
//   }, [socket])

useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  
    return ( 

    <>
      <div className="chat-window"><div style={{ color: "grey" }}>
        {/* <div className="chat-header">
          <p>Live Chat</p>
        </div> */}
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={username === messageContent.author ? "you" : "other"}
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
      </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>

      </div>
    </>);
}

export default ChatRoom;