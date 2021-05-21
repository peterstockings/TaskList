import React from 'react';
import "../TaskList/TaskList.css";

export default function List(props) {
    return (
        <>
        {props.item.map(item=>{
            return (
            <div key={item.id} className="task-item" >
                <div className="task-content">
                <p>{item.name}</p>
                <p>{item.description}</p> 
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