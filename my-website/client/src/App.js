import './App.css';
// import RandomVideo from './components/RandomVideo';
// import NavBar from './components/NavBar';
// import HomePage from './components/HomePage';
import Chat from './components/Chat';
import { useState } from 'react';

import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

function App() {

  const [room, setRoom] = useState("");
  const [showChat, setChat] = useState(false);
  const [userName, setUsername] = useState("");

  const joinRoom = () => {
    if(room !== "") {
      socket.emit('join_room', room);
      setChat(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">

        <h3>Active Rooms:</h3>
        {/* {io.sockets.adapter.rooms.map ( e => 
          <div style={{color:'green'}}>{e}</div>
        )} */}

        {/* <NavBar /> */}
        {/* <HomePage /> */}
        {!showChat ? (
          <div className="joinChatContainer">
            <h3>Join A Chat</h3>
            <input
              type="text"
              placeholder="Enter Username..."
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Enter a Room ID..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button onClick={joinRoom}>Join A Room</button>
          </div>
        ) : (
          <Chat socket={socket} username={userName} room={room} />
        )}
        {/* Random Video for Today */}
        {/* <RandomVideo /> */}
      </header>
    </div>
  );
}

export default App;
