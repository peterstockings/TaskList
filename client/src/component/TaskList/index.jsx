import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./TaskList.css";
import List from "../List";
import ModalTask from "../Modal/ModalTask";
import { rootContext } from "../../App";

export default function TaskList() {
  const [taskLists, setTaskList] = useState(null);
  const task = useContext(rootContext);
  useEffect(() => {
    const getTaskList = async () => {
      const res = await axios.get("http://localhost:5001/tasks/all");
      setTaskList(res.data);
    };
    getTaskList();
  }, []);
  return (
    <div className="wide slider">
      {taskLists
        ? taskLists.map((item, index) => {
            return (
              <div className="wrapper td" key={index}>
                <ModalTask
                  collection_id={item["list"][0]["collection_id"]}
                  task_open={task["taskOpen"]}
                />
                <div className="td__header">
                  <div className="td__header-title">
                    <p> {item["list"][0]["collection_id"]} </p>
                  </div>
                  <div className="td__header-task">
                    <p> {item["list"].length} Task</p>
                    <button
                      className="addtodo"
                      onClick={() => task["toggleTask"]()}
                    />
                  </div>
                </div>
                <List item={item["list"]} />
              </div>
            );
          })
        : ""}
    </div>
  );
}
