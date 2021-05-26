import React, { useContext } from "react";
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
    border: "1px solid grey",
  },
};

export default function ModalUpdateTask(props) {
  const isOpen = useContext(rootContext);
  const onSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:5001/tasks/update/" + props.id, {
      collection_id: props.collectionId,
      name: document.getElementById("updateName").value,
      description: document.getElementById("updateDescription").value,
      deadline: document.getElementById("updateDeadline").value,
      completed: false,
    });
    isOpen["toggleUpdate"]();
    window.location.reload();
  };

  return (
    <div>
      <Modal
        isOpen={isOpen["updateOpen"]}
        style={customStyles}
        ariaHideApp={false}
      >
        <button
          style={{
            position: "relative",
            float: "right",
            color: "red",
            fontSize: "24px",
            border: "none",
            width: "12px",
          }}
          onClick={() => isOpen["toggleUpdate"]()}
        >
          x
        </button>

        <form onSubmit={onSubmit}>
          <label>
            Name:
            <input type="text" id="updateName" />
          </label>
          <label>
            Description:
            <input type="text" id="updateDescription" />
          </label>
          <label>
            Deadline:
            <input type="date" id="updateDeadline" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    </div>
  );
}
