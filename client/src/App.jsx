import "./App.scss";
import TaskList from "./component/TaskList";
import ModalList from "./component/Modal/ModalList";
import ModalTaskList from "./component/Modal/ModalTask";
import ModalUpdateTask from "./component/Modal/ModalUpdateTask";
import React, { useState, createContext } from "react";

export const rootContext = createContext();

function App() {
  const [listOpen, setListOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [id, setId] = useState(0);
  const [collectionId, setCollectionId] = useState(0);
  function toggleList() {
    setListOpen(!listOpen);
  }
  function toggleTask() {
    setTaskOpen(!taskOpen);
  }
  function toggleUpdate() {
    setUpdateOpen(!updateOpen);
  }
  function toggleId(num) {
    setId(num);
  }
  function toggleCollectionId(num) {
    setCollectionId(num);
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
        toggleId,
        toggleCollectionId,
      }}
    >
      <div className="mainContainer">
        <div className="header">
          <h1> TASK LIST </h1>
        </div>
        <TaskList />
        <ModalList />
        <ModalTaskList id={id} collectionId={collectionId} />
        <ModalUpdateTask id={id} collectionId={collectionId} />
      </div>
    </rootContext.Provider>
  );
}

export default App;
