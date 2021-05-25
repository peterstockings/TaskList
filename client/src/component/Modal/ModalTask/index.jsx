import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";

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

export default function ModalTask(props) {
  const [modalIsOpen, setIsOpen] = React.useState(props.task_open);
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5001/tasks/add", {
      collection_id: props.collection_id,
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      deadline: document.getElementById("deadline").value,
    });
    setIsOpen(false);
  };

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}> close </button> <div> I am a modal </div>{" "}
        <form onSubmit={onSubmit}>
          <label>
            Name:
            <input type="text" name="name" id="name" />
          </label>
          <label>
            Description:
            <input type="text" name="description" id="description" />
          </label>
          <label>
            Deadline:
            <input type="date" name="deadline" id="deadline" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    </>
  );
}
