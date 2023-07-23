import { React, useState } from "react";
import TodoForm from './Components/TodoForm';
import Todo from "./Components/Todo";
import './App.css'
const App = () => {
  let [todos, setTodos] = useState([])
  const [todoToShow, setTodoToShow] = useState("all")

  const addTodo = (todo) => {
    setTodos([todo, ...todos])
  }
  const [toggleAllComplet, setToggleAllComplet] = useState(true)

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }
  const updateTodoToShow = (s) => {
    setTodoToShow(s)
  }

  const removeAllComplete = () => {
    setTodos(todos.filter((todo) => !todo.complete))
  }

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete,
          };
        } else {
          return todo;
        }
      })
    );
  };


  if (todoToShow === 'active') {
    todos = todos.filter((todo) => !todo.complete)
  }
  else if (todoToShow === 'complete') {
    todos = todos.filter((todo) => todo.complete)
  }




  return (
    <div className='container'>
      <TodoForm onSubmit={addTodo} />
      {
        todos.map((todo) =>
        (
          <Todo key={todo.id} todo={todo} onDelete={() => handleDelete(todo.id)}
            toggleComplete={() => toggleComplete(todo.id)}
          />
        ))
      }

      <div>
        <button className="update-btn btn" onClick={() => updateTodoToShow("all")} >all</button>
        <button className="update-btn btn" onClick={() => updateTodoToShow("active")}>active</button>
        <button className="update-btn btn" onClick={() => updateTodoToShow("complete")} >complete</button>
      </div>
{todos.some((todo)=>todo.complete)? (
      <button className="all-btn btn" onClick={removeAllComplete}>Remove all complete todos </button>) : null
    }
      <button className="all-btn btn" onClick={
        () => {
          setTodos(
            todos.map((todo) => ({
              ...todo, complete: toggleAllComplet
            })
            )

          )
          setToggleAllComplet(!toggleAllComplet)
        }

      }> Toggle all complete : {`${toggleAllComplet}`} </button>
    </div>
  );
}

export default App;
