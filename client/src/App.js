import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import io from "socket.io-client";
import "./App.css";

function App() {
  const [messages, addMessage] = useState([]);

  let socket;

  useEffect(() => {
    socket = io("http://localhost:3000");
    socket.on("sms", sms => {
      addMessage([...messages, sms]);
    });
  });

  return (
    <div className="App">
      <ul>
        {messages.map(sms => (
          <li>{sms}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
