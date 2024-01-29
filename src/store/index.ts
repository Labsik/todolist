import { selectedTodoReducer } from './slices/selectedTodoSlice';
import { configureStore } from "@reduxjs/toolkit";
import { todosReducer } from "./slices/todosSlice";

const reducer = {
    todos: todosReducer,
    selectedTodo: selectedTodoReducer
}

export default configureStore({
    reducer,
  });
