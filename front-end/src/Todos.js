import { useQuery, gql, useMutation } from "@apollo/client";
import "./Todos.css";
import AddTodo from "./AddToDo";
import React, { useState } from "react";
import Card from "./Card";

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      description
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $description: String!) {
    updateTodo(id: $id, description: $description) {
      description
    }
  }
`;

function Todos() {
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const [todos, setTodos] = useState([]);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);

  React.useEffect(() => {
    if (!loading && data) {
      setTodos(data.todos);
    }
  }, [loading, data]);

  const handleAddTodo = (newTodo) => {
    console.log("newtodo", newTodo)
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo({
        variables: { id },
        refetchQueries: [{ query: GET_TODOS }],
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleUpdateTodo = async (id, description) => {
    const newDescription = prompt("Edit description: ", description);
    if (newDescription) {
      try {
        await updateTodo({
          variables: { id, description: newDescription },
        });
        refetch();
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error bruh</p>;

  return (
    <div className="todoMain">
      <h1 className="todoHeading">
        Let's Do <span style={{ color: "#8461F6" }}> It Now!</span>
      </h1>
      <AddTodo onAddTodo={handleAddTodo}></AddTodo>

      <div className="todoList">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            todo={todo}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default Todos;
