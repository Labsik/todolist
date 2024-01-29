import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store/index.ts';
import { hydrate } from './store/slices/todosSlice.ts';
import App from './App.tsx';

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

const getTodosFromLocalStorage = () => {
  try {
    const persistedState = localStorage.getItem('reduxState')
    if (persistedState)
      return JSON.parse(persistedState)
  }
  catch (e){
    console.log(e)
  }
}

const todos = getTodosFromLocalStorage()

if(todos){
  store.dispatch(hydrate(todos.todos))
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
