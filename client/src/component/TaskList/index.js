import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./TaskList.css";
import List from "../List"
export default function TaskList() {
  const [taskLists, setTaskList] = useState(null);
  useEffect(()=> {
    const getTaskList = async () => {
      const res = await axios.get("http://localhost:5001/tasks/all");
      setTaskList(res.data);
    }
    getTaskList();
  },[]);
  return (
    <div className="slide">
     {taskLists ? taskLists.map(item=>{
       return(
        <div  className="container" key={item["list"][0]["collection_id"]}>
            <h1>{item["list"][0]["collection_id"]}</h1>
            <List item={item["list"]}/>
            <div>
                <button>ADD TASK</button>
                <button>DELETE ALL</button>
            </div>
        </div>
       )
     }):""} 
     </div>
  );
}