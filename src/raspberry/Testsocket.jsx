import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import './Dashboardc.css'
const Testsocket = () => {
  const [process_time, setProcess_time] = useState()
  // const [machineA1_status, setMachineA1_status] = useState(null);
  // const [machineA1_part, setMachineA1_part] = useState(null);
  const [machineA1_count, setMachineA1_count] = useState(0);
  // const [machineA1_unnormal, setMachineA1_unnormal] = useState()
  // const [machineA2_status, setMachineA2_status] = useState()
  // const [machineA2_part, setMachineA2_part] = useState()
  const [machineA2_count, setMachineA2_count] = useState(0)
  // const [machineA2_unnormal, setMachineA2_unnormal] = useState()
  const [machineA3_count, setMachineA3_count] = useState(0)
  const [machineB, setMachineB] = useState(0)
  const [machineC, setMachineC] = useState(0)
  const [problem, setProblem] = useState(null)

  useEffect(() => {
    const socket = socketIOClient('http://localhost:5000/test');

    socket.on('process_time', (message) => {
      setProcess_time(message.Time);
    });
    socket.on('problem', (message) => {
      setProblem(message.problem);
    });

    socket.on('machineA1_count', (message) => {
      setMachineA1_count(message.count);
    });
    
    socket.on('machineA2_count', (message) => {
      setMachineA2_count(message.count);
    });
    
    socket.on('machineA3_count', (message) => {
      setMachineA3_count(message.count);
    });
    socket.on('completed_product', (message) => {
      setMachineB(message.completed_product);
    });
    socket.on('unnormal_total', (message) => {
      setMachineC(message.unnormal_total);
    });


    // Disconnect when the client unmounts
    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <div className='setposition'>
      <h1>Production Board</h1>
      <p>Time : {process_time}</p>
      <div className='workingbox' style={{backgroundColor: problem ==='problem occurency' ? 'red' : 'green'}}>{problem}</div>
      <div className='part_table'>
        <table>
          <thead>
            <tr>
              <th>Part</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Head</td>
              <td>{machineA1_count}</td>
            </tr>
            <tr>
              <td>Body</td>
              <td>{machineA2_count}</td>
            </tr>
            <tr>
              <td>Foot</td>
              <td>{machineA3_count}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='count_table'>
        <table>
          <thead>
            <tr>
              <th>Complete_Product_Count</th>
              <th>Defective_Product_Count</th>
            </tr>
            
          </thead>
          <tbody>
            <tr>
              <td>{machineB}</td>
              <td>{machineC}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Testsocket;
