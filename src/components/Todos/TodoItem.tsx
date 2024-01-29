import { MouseEventHandler } from 'react'
import { Todo } from '../../types/types'
import './index.css'


interface TodoItemProps {
  todo: Todo,
  index: number,
  selectedTodoId: string | null,
  handleSelectTodo: (id: string) => MouseEventHandler<HTMLLIElement>
}

export const TodoItem = ({todo, index, selectedTodoId, handleSelectTodo}: TodoItemProps) => {
  return (
    <li
    className={`${todo.isComplete ? 'done' : ''} ${
      todo.id === selectedTodoId ? 'active' : ''
    }`}
    key={todo.id}
    onClick={handleSelectTodo(todo.id)}
  >
    <span className='list-number'>{index + 1}</span> {todo.desc}
  </li>
  )
}
