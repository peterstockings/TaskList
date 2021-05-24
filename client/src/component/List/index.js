import React from 'react';
import "./List.css";

export default function List(props) {
    return (
        <>
        {props.item.map((item, index)=>{
            return (              
            <div key={index} className="task-item" >
                <div className="task-content">
                <h4>Name:</h4>
                <p>{item.name}</p>
                <h4>Description:</h4> 
                <p>{item.description}</p>
                <h4>Date:</h4>
                <p>{item.deadline}</p>
                </div>
                <div className="update">
                    UPDATE
                </div>
                <div className="delete">
                    DELETE
                </div>
            </div>
            )
        })
        }
   </>
)}