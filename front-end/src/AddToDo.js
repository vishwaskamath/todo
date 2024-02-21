import React from "react";
import { useMutation, gql } from "@apollo/client";
import "./AddToDo.css";
const CREATE_TODO = gql`
  mutation CreateTodo($description: String!) {
    createTodo(description: $description) {
      id
      description
    }
  }
`;

function AddTodo({ onAddTodo }) {
  const [createTodo] = useMutation(CREATE_TODO);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const description = e.target.elements.description.value;

    try {
      const { data } = await createTodo({
        variables: { description },
      });
      onAddTodo(data.createTodo);
      e.target.elements.description.value = "";
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className="addToDoMain">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          placeholder="What's the task"
          className="inputTodo"
          required
        />{" "}
        &nbsp;
        <button
          type="submit"
          className="submitButton"
        >
          ADD
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
