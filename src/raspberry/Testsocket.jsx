import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

const Testsocket = () => {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

  useEffect(() => {
    const socket = socketIOClient('http://localhost:5000/test');
    socket.on('data1', (message) => {
      setData1(message.product);
    });
    socket.on('data2', (message) => {
      setData2(message.product);
    });

    // Disconnect when the client unmounts
    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <div>
      <h1>Data 1: {data1}</h1>
      <h1>Data 2: {data2}</h1>
    </div>
  );
};

export default Testsocket;
