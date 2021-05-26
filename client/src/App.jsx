import "./App.scss";
import TaskList from "./component/TaskList";
import ModalList from "./component/Modal/ModalList";
import React, { useState, createContext } from "react";

export const rootContext = createContext();

function App() {
  const [listOpen, setListOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  function toggleList() {
    setListOpen(!listOpen);
  }
  function toggleTask() {
    setTaskOpen(!taskOpen);
  }
  function toggleUpdate() {
    setUpdateOpen(!updateOpen);
  }
  return (
    <rootContext.Provider
      value={{
        listOpen,
        taskOpen,
        updateOpen,
        toggleList,
        toggleTask,
        toggleUpdate,
      }}
    >
      <div className="mainContainer">
        <div className="header">
          <h1> TASK LIST </h1>
        </div>
        <TaskList />
        <ModalList />
      </div>
    </rootContext.Provider>
  );
}

export default App;
