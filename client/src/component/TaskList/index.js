import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./TaskList.css";
import List from "../List"
export default function TaskList() {
  const [taskLists, setTaskList] = useState(null);
  useEffect(()=> {
    const getTaskList = async () => {
      const res = await axios.get("http://localhost:5001");
      setTaskList(res.data);
    }
    getTaskList();
  },[]);
  return (
    <div className="slide">
     {taskLists ? taskLists.map(item=>{
       return(
        <div  className="container" key={item.title}>
            <h1>{item.title}</h1>
            <List item={item.items}/>
            <div>
                <button>ADD TASK</button> 
            </div>
        </div>
       )
     }):""} 
     </div>
  );
}