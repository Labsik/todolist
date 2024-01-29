import {
    createSlice,
    PayloadAction,
  } from '@reduxjs/toolkit';

const selectedTodoSlice = createSlice({
    name: 'selectedTodo',
    initialState: null as string | null,
    reducers: {
      select: (_, { payload }: PayloadAction<{ id: string }>) => payload.id,
    },
  });

export const { select: selectTodoActionCreator } = selectedTodoSlice.actions;


export const selectedTodoReducer = selectedTodoSlice.reducer
