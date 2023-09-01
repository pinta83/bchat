import Login from './Components/Login';
import Chat from './Components/Chat';
import { useState } from 'react';
import './App.css';

function App() {

  const [userRoom, setUserRoom] = useState({});
  const [drone, setDrone] = useState({});
  const [user, setUser] = useState({});
  const [users, setUsers] = useState({});
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);

  const roomName = "observable-test1";
  // const scaleDroneChannelId = 'qDSBckvdMDDQ4kPT'; // D
  const scaleDroneChannelId = '8HoB5pRoWlgVQ5oM'; // Exa

  const scrollMessages = () => {
    setTimeout(() => {
      const porukeWindow = document.getElementById('messages');
      porukeWindow.scrollTo({
        top: porukeWindow.scrollHeight,
        behavior: 'smooth'
      })
    }, 1)
  };

  const handleLogin = (username) => {

    var newUser = {
      name: username,
      color: randomBoja(),
    }

    setUser(newUser);
    setUsername(username);

    const droneConnection = new window.Scaledrone(scaleDroneChannelId, {
      data: newUser
    });

    droneConnection.on('open', error => {
      if (error) {
        alert('greška');
        return console.error(error);
      }

      newUser.id = droneConnection.clientId;

      setUser(newUser);
    });
    setDrone(droneConnection);


    const room = droneConnection.subscribe(roomName, { historyCount: 10 });
    room.on('message', message => {
      if (typeof (message.data) == "string") {
        messages.push(message)
        setMessages({ ...messages })
        scrollMessages();
      }
    });

    // Postavljanje inicijalnih poruka iz chat history-ja
    // Da bi ovo radilo potrebno je u subscribe metodi dati dodatne parametre koliko poruka želimo
    room.on('history_message', message => {
      // Preskačemo poruke koje nemaju clientData (inicijalno loadane, jel)
      // Ovo bi trebalo doraditi jer svašta dolazi od API-ja.. neki recordi imaju clientData, neki nemaju
      if (typeof (message.data) == "string") {
        messages.push(message)
        setMessages({ ...messages })
        scrollMessages();
      }
    });

    // Event koji se okida kod logina, u njemu dobijemo trenutni popis prijavljenih korisnika
    room.on('members', members => {
      members.forEach((member) => (
        users[member.id] = {
          id: member.id,
          name: (member.hasOwnProperty('clientData') ? member.clientData.name : 'Nepoznati korisnik'),
          color: (member.hasOwnProperty('clientData') ? member.clientData.color : randomBoja()),
        }
      ));
      setUsers({ ...users })
    });

    // Event koji se okida kad se novi se prijavi novi korisnik
    room.on('member_join', member => {
      users[member.id] = {
        id: member.id,
        name: (member.hasOwnProperty('clientData') ? member.clientData.name : 'Nepoznati korisnik'),
        color: (member.hasOwnProperty('clientData') ? member.clientData.color : randomBoja()),
      }
      setUsers({ ...users });
    });
    
    // Event koji se okida kad se novi neki korisnik odjavi
    room.on('member_leave', ({ id }) => {
      Object.keys(users).map((key) => {
        if (users[key].id === id) {
          delete users[key]
          setUsers({ ...users });
        }
        return key;
      })
      setUsers({ ...users });
    });

    setUserRoom(room);

  };

  // Logout: zatvaranje konekcije sa Scaledrone-om i resetiranje username-a
  const handleLogout = () => {
    drone.close(); // 
    setUsername("");
  };

  function randomBoja() {
    var letters = '012345'.split('');
    var color = '#';
    color += letters[Math.round(Math.random() * 5)];
    letters = '0123456789ABCDEF'.split('');
    for (var i = 0; i < 5; i++) {
      color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  }

  return (
    <div className="AppRoot">
      {username ? (
        <Chat users={users} user={user} drone={drone} room={userRoom} roomName={roomName} messages={messages} handleLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;