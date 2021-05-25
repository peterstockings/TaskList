import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TaskList.css";
import List from "../List";
import ModalTask from "../Modal/ModalTask";

export default function TaskList() {
  const [taskLists, setTaskList] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const getTaskList = async () => {
      const res = await axios.get("http://localhost:5001/tasks/all");
      setTaskList(res.data);
    };
    getTaskList();
  }, []);
  return (
    <div className="slider">
      {taskLists
        ? taskLists.map((item) => {
            return (
              <div
                className="wrapper td"
                key={item["list"][0]["collection_id"]}
              >
                <ModalTask
                  collection_id={item["list"][0]["collection_id"]}
                  task_open={open}
                />
                <div className="td__header">
                  <div className="td__header-title">
                    <p> {item["list"][0]["collection_id"]} </p>
                  </div>
                  <div className="td__header-task">
                    <p> {item["list"].length} Task</p>
                    <button
                      className="addtodo"
                      onClick={() => setOpen(!open)}
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
