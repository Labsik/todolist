import {
    createSlice,
    PayloadAction,
  } from '@reduxjs/toolkit';
import { initialTodos } from '../../data/data';
import { Todo } from '../../types/types';

const todosSlice = createSlice({
    name: 'todos',
    initialState: initialTodos,
    reducers: {
      hydrate:(_, action) => {
        return action.payload
        },
      create: {
        reducer: (
          state,
          {
            payload,
          }: PayloadAction<{ id: string; desc: string; isComplete: boolean }>
        ) => {
          state.push(payload);
        },
        prepare: (todo: Todo) => ({
          payload: todo
        }),
      },
      edit: (state, { payload }: PayloadAction<{ id: string; desc: string }>) => {
        const todoToEdit = state.find((todo) => todo.id === payload.id);
        if (todoToEdit) {
          todoToEdit.desc = payload.desc;
        }
      },
      toggle: (
        state,
        { payload }: PayloadAction<{ id: string; isComplete: boolean }>
      ) => {
        console.log('state', state)
        const index = state.findIndex((todo) => todo.id === payload.id);
        if (index !== -1) {
          state[index].isComplete = payload.isComplete;
        }
      },
      remove: (state, { payload }: PayloadAction<{ id: string }>) => {
        const index = state.findIndex((todo) => todo.id === payload.id);
        if (index !== -1) {
          state.splice(index, 1);
        }
      },
    },
  });

  export const {
    create: createTodoActionCreator,
    edit: editTodoActionCreator,
    toggle: toggleTodoActionCreator,
    remove: deleteTodoActionCreator,
    hydrate
  } = todosSlice.actions;

export const todosReducer = todosSlice.reducer
