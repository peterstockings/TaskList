import React, { useState, useContext } from "react";
import axios from "axios";
import Modal from "react-modal";
import { rootContext } from "../../../App";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function ModalList() {
  const isOpen = useContext(rootContext);
  const onSubmit = (e) => {
    axios.post("http://localhost:5001/tasks/add", {
      collection_id: document.getElementById("name").value,
      name: "This is your title",
      description: "This is your description",
      deadline: "2020-12-31",
    });
    isOpen["toggleList"]();
    window.location.reload();
  };
  const deleteAll = () => {
    axios.delete("http://localhost:5001/tasks/");
    window.location.reload();
  };
  return (
    <>
      <Modal
        isOpen={isOpen["listOpen"]}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={() => isOpen["toggleList"]()}> close </button>
        <div> I am a modal </div>
        <form onSubmit={onSubmit}>
          <label>
            Name:
            <input type="text" name="name" id="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Modal>
      <div className="center">
        <div className="addList" onClick={() => isOpen["toggleList"]()}>
          NEW LIST
        </div>
        <div className="addList" onClick={() => deleteAll()}>
          DELETE ALL
        </div>
      </div>
    </>
  );
}
