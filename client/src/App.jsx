import "./App.scss";
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import {API_URL} from './constants/API.constants'
import Card from "./components/card/Card";

function App() {
  const [taskLists, setTaskList] = useState([]);

  useEffect(() => {

    fetch(`${API_URL}/api/tasks`)
      .then(res => res.json())
      .then(tasks => {
        //console.log('Fetched: ', tasks)
        setTaskList(tasks);
      })
      .catch(err => console.log('Error: ',err))
      //.finally(() => console.log('request complete'))

      const socket = socketIOClient(`${API_URL}`);
      socket.on("tasks", tasks => {
        setTaskList(tasks)
        //console.log(tasks);
      });

  }, []);

  return (
    <main className="grid">
      {taskLists.length > 0
        ? taskLists.map((task) => <Card key={task._id} task={task}/>)
        : ""}
    </main>
  );
}

export default App;
