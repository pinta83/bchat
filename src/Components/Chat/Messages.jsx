import { useState } from "react";

const Messages = (props) => {

    const [inputMessage, inputMessageChange] = useState("");

    const handleInputMessageSubmit = (e) => {
        e.preventDefault();
        props.drone.publish({
            room: props.roomName,
            message: inputMessage
        });
        inputMessageChange(''); // Brisanje poslanog teksta
    };

    return (
        <div className="messagesPane">
            <div id="messagesWrap">
                <ul id="messages">
                    {Object.keys(props.messages).map((key) => {
                        return (
                            <li key={props.messages[key].id} className={props.user.id === props.messages[key].clientId ? 'message ownMessage' : 'message'}>
                                <div className="msgAvatar"><i className="fa fa-user"></i></div>
                                <div className="msgContent">
                                    <span className="msgUser"><span className="msgUserName">{getNameFromMessage(props.messages[key])}</span>, {formatTimestamp(props.messages[key].timestamp)}h</span>
                                    <div className="msgTexts">
                                        {props.messages[key].hasOwnProperty('member') && props.messages[key].member.hasOwnProperty('clientData') &&
                                            <div className="msgText" style={{ backgroundColor: props.messages[key].member.clientData.color }}>{props.messages[key].data}</div>
                                        }
                                        {!props.messages[key].hasOwnProperty('member') &&
                                            <div className="msgText">{props.messages[key].data}</div>
                                        }
                                    </div>
                                </div>

                            </li>
                        );
                    })}
                </ul>
            </div>

            <form className="inputMessage" onSubmit={handleInputMessageSubmit}>
                <input value={inputMessage} placeholder="Upiši poruku i pritisni enter..." onChange={(e) => inputMessageChange(e.target.value)} />
            </form>

        </div>

    )

}

function formatTimestamp(timestamp) {
    var jsTimestamp = timestamp * 1000; // js timestamp ima tisućice, a od Scaledrone-a dobivamo Unix timestamp koji je u sekundama (nema tisućice)

    const date = new Date();
    const todayDate = new Intl.DateTimeFormat('hr-HR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
    const msgDate = new Intl.DateTimeFormat('hr-HR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(jsTimestamp);

    if (todayDate === msgDate)
        return new Intl.DateTimeFormat('hr-HR', { hour: '2-digit', minute: '2-digit' }).format(jsTimestamp);
    else
        return new Intl.DateTimeFormat('hr-HR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(jsTimestamp);
}

function getNameFromMessage(message) {
    var name = message.id
    if (message.hasOwnProperty('member') && message.member.hasOwnProperty('clientData')) {
        name = message.member.clientData.name;
    }
    return name;
}

export default Messages