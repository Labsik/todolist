import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { v1 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';

import './index.css'
import { State, Todo } from '../../types/types';
import { createTodoActionCreator, deleteTodoActionCreator, editTodoActionCreator, toggleTodoActionCreator } from '../../store/slices/todosSlice';
import { selectTodoActionCreator } from '../../store/slices/selectedTodoSlice';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state: State) => state.todos);
  const selectedTodoId = useSelector((state: State) => state.selectedTodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const [newTodoInput, setNewTodoInput] = useState<string>('');
  const [editTodoInput, setEditTodoInput] = useState<string>('');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const editInput = useRef<HTMLInputElement>(null);

  const selectedTodo =
    (selectedTodoId && todos.find((todo: Todo) => todo.id === selectedTodoId)) ||
    null;

    console.log('selectedTodo', selectedTodo)

  const handleNewInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTodoInput(e.target.value);
  };

  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditTodoInput(e.target.value);
  };

  const handleCreateNewTodo = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!newTodoInput.length) return;

    const newTodo = {id: uuid(), desc: newTodoInput.trim(),isComplete: false }

    dispatch(createTodoActionCreator(newTodo));
    setNewTodoInput('');
  };

  const handleSelectTodo = (todoId: string) => (): void => {
    dispatch(selectTodoActionCreator({ id: todoId }));
  };

  const handleEdit = (): void => {
    if (!selectedTodo) return;

    setEditTodoInput(selectedTodo.desc);
    setIsEditMode(true);
  };

  useEffect(() => {
    if (isEditMode) {
      editInput?.current?.focus();
    }
  }, [isEditMode]);

  const handleUpdate = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!editTodoInput.length || !selectedTodoId) {
      handleCancelUpdate();
      return;
    }

    dispatch(
      editTodoActionCreator({ id: selectedTodoId, desc: editTodoInput })
    );

    setIsEditMode(false);
    setEditTodoInput('');
  };

  const handleCancelUpdate = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e?.preventDefault();
    setIsEditMode(false);
    setEditTodoInput('');
  };

  const handleToggle = (): void => {
    if (!selectedTodoId || !selectedTodo) return;

    dispatch(
      toggleTodoActionCreator({
        id: selectedTodoId,
        isComplete: !selectedTodo.isComplete,
      })
    );
  };

  const handleDelete = (): void => {
    if (!selectedTodoId) return;

    dispatch(deleteTodoActionCreator({ id: selectedTodoId }));
  };

  return (
    <div className='App'>
      <div className='App__header'>
        <h1>My Todo List</h1>
        <form onSubmit={handleCreateNewTodo}>
          <label htmlFor='new-todo'>Add new:</label>
          <input
            onChange={handleNewInputChange}
            id='new-todo'
            value={newTodoInput}
          />
          <button type='submit'>Create</button>
        </form>
      </div>
      <div className='App__body'>
        <ul className='App__list'>
          <h2>My Todos:</h2>
          {todos?.map((todo: Todo, i: number) => (
            <TodoItem key={todo.id} todo={todo} index={i} selectedTodoId={selectedTodoId} handleSelectTodo={handleSelectTodo} />
          ))}
        </ul>
        <div className='App_todo-info'>
          <h2>Selected Todo:</h2>
          {selectedTodo === null ? (
            <span className='empty-state'>No Todo Selected</span>
          ) : !isEditMode ? (
            <>
              <span
                className={`todo-desc ${
                  selectedTodo?.isComplete ? 'done' : ''
                }`}
              >
                {selectedTodo.desc}
              </span>
              <div className='todo-actions'>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleToggle}>Toggle</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </>
          ) : (
            <form onSubmit={handleUpdate}>
              <label htmlFor='edit-todo'>Edit:</label>
              <input
                ref={editInput}
                onChange={handleEditInputChange}
                value={editTodoInput}
              />
              <button type='submit'>Update</button>
              <button onClick={handleCancelUpdate}>Cancel</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
