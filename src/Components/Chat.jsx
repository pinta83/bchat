import { useState } from "react";
import '../App.css';
import UsersPane from './Chat/UsersPane';
import Messages from "./Chat/Messages";

const Chat = (props) => {

    const [inputMessage, inputMessageChange] = useState("");

    return (
        <div className="App chat-view">
            <UsersPane users={props.users} user={props.user} drone={props.drone} handleLogout={props.handleLogout} />
            <Messages
                drone={props.drone}
                roomName={props.roomName}
                inputMessage={inputMessage} inputMessageChange={inputMessageChange}
                messages={props.messages} setMessages={props.setMessages}
                user={props.user}
            />
        </div>
    )

}

export default Chat