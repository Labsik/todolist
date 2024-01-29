import { v1 as uuid } from 'uuid';

export const initialTodos = [
    {
        id: uuid(),
        desc: 'Netflix and chill',
        isComplete: true,
      },
      {
        id: uuid(),
        desc: 'Pizza Party',
        isComplete: true,
      },
      {
        id: uuid(),
        desc: 'Sleep',
        isComplete: false,
      },
]