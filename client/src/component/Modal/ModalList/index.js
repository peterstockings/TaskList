import React, {useState} from 'react';
import axios from "axios";
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

export default function ModalList() {
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5001/lists/add", {
      name: document.getElementById('name').value,
    });
  }
  const deleteAll=()=> {
    axios.delete("http://localhost:5001/lists/");
  }
  function closeModal(){
    setIsOpen(false);
  }
  return (
    <>
    <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
    
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
          <form onSubmit = {onSubmit}>
          <label>
            Name:
            <input type="text" name="name" id="name"/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
        </Modal>
    <div className="center">
      <div className="addList" onClick={()=>setIsOpen(!modalIsOpen)}>
        NEW LIST
      </div>
      <div className="addList" onClick={()=>deleteAll()}>
        DELETE ALL
      </div>
    </div>
    </>
  )
}