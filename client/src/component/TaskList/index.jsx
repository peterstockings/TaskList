import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./TaskList.css";
import List from "../List";
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
  function addTask(num) {
    task["toggleCollectionId"](num);
    task["toggleTask"]();
  }
  return (
    <div className="wide slider">
      {taskLists
        ? taskLists.map((item) => {
            return (
              <div
                className="wrapper td"
                key={item["list"][0]["collection_id"]}
              >
                <div className="td__header">
                  <div className="td__header-title">
                    <p> {item["list"][0]["collection_id"]} </p>
                  </div>
                  <div className="td__header-task">
                    <p> {item["list"].length} Task</p>
                    <button
                      className="addtodo"
                      onClick={() => addTask(item["list"][0]["collection_id"])}
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
