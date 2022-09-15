import { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


function Chat({ socket, username, room }) {

  const [currMessage, setCurrMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((list) => [...list, data]);
    })
  }, [socket])

  const sendMessage = async () => {
    if (currMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      await socket.emit('send_message', messageData);
      setMessages((list) => [...list, messageData]);
      setCurrMessage("");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messages.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
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
          value={currMessage}
          placeholder="Type something..."
          onChange={(event) => {
            setCurrMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}><FontAwesomeIcon icon={faPaperPlane} /></button>
      </div>
    </div>
  );
}

export default Chat;
