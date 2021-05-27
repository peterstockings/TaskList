import React from "react";
import "./Card.scss";

export default function Card(props) {

  const {name, description, completed, deadline} = props.task

  return (
    <article className="card">
      <div className="text">
        <h3>{name}</h3>
        <p>{description}</p>
        <button>Read more</button>
      </div>
    </article>
  );
  }
  