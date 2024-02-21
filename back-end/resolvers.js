const Todo = require("./config/todo.model");

const Query = {
  todos: async () => await Todo.findAll(),
};
const Mutation = {
  createTodo: async (_, { description }) => {
    try {
      const newTodo = await Todo.create({ description });
      return newTodo;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateTodo: async (_, { id, description }) => {
    try {
      const todoFromDb = await Todo.findByPk(id);
      if (!todoFromDb) {
        return null;
      }
      todoFromDb.description = description;
      await todoFromDb.save();
      return todoFromDb;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteTodo: async (_, { id }) => {
    try {
      const todoFromDb = await Todo.findByPk(id);
      if (!todoFromDb) {
        return null;
      }

      await todoFromDb.destroy();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  },
};
module.exports = { Query, Mutation };
