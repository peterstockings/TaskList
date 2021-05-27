import "./App.scss";
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import {API_URL} from './constants/API.constants'
import TaskCard from "./components/TaskCard/TaskCard";
import API from './services/API.service'

function App() {
  const [taskLists, setTaskList] = useState([]);

  useEffect(() => {

    API.fetchAll()
      .then(tasks => {
        setTaskList(tasks);
      })
      .catch(err => console.log('Error: ',err))

    const socket = socketIOClient(`${API_URL}`);
    socket.on("tasks", tasks => {
      setTaskList(tasks)
    });

  }, []);

  return (
    <main>
      {taskLists.map(groupOfTasks => (
        <div className="group-card">
          <h1 className="title is-2 pad-title">{groupOfTasks.collection_id}</h1>
          <div className="grid">
            {groupOfTasks.tasks.map((task) => <TaskCard key={task._id} task={task}/>)}
          </div>
          </div>
      ))}
      
    </main>    
  );
}

export default App;
