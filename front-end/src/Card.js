import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import "./Card.css";

const Card = ({ todo, onDelete, onUpdate }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-desc">{todo.description}</h2>
        <div className="card-div">
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => onUpdate(todo.id, todo.description)}
            className="faEdit"
          />{" "}
          &nbsp; &nbsp;
          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={() => onDelete(todo.id)}
            className="faTrash"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
