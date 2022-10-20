
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ChatList from "./ChatList";
import apiBaseUrl from "../../api"

const Chat = (props) => {
    const [chatsArr, setChatsArr] = useState();

    useEffect(() => {
        const fetchChat = async () => {
            try {
                const response = await fetch(apiBaseUrl + `/api/users/showChats`, {
                    headers: {
                        token: "JWT " + props.token
                    }
                })

                const data = await response.json();
                setChatsArr(data)

            } catch (error) {

            }
        }

        fetchChat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="profile">
            <Header headline={"Chat"} />
            <ChatList chatsArr={chatsArr} currentUsername={props.dogName} />
            <Footer />
        </div>
    );
}

export default Chat;