import './App.css';
import { useEffect, useState } from "react";
function App() {

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });


  const [todo, setTodo] = useState("");
  const [idCounter, setIdCounter] = useState(1);


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])


  function handleInput(e) {
    setTodo(e.target.value);
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo.trim() !== "") {
      const existingTask = todos.find(task => task.text.trim() === todo.trim());
      if (existingTask) {
        alert("This task already exists!");
      } else {
        setTodos([
          ...todos,
          {
            id: idCounter,
            text: todo.trim()
          }
        ]);
        setIdCounter(idCounter + 1);
      }
    }

    setTodo("");
  }



  function handleDeleteClick(id) {
    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(updatedTodos);
    
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }


  return (
    <div className="App">

      <div className='tasks-container'>
        {todos.length === 0 ? (
          <h3>No tasks created.</h3>
        ) : (
          <div className='tasks'>
            {todos.map((todo) => (
              <li className='item' key={todo.id}>
                <span className="task-text">{todo.text}</span>
                <button className='delete' onClick={() => handleDeleteClick(todo.id)}>X</button>
              </li>
            ))}
          </div>
        )}
      </div>
      <div className='form-items'>
        <form onSubmit={handleSubmit}>
          <input onChange={handleInput} name='todo' type='text' className='border-blue-500' placeholder="Create a task" required />
          <button>Add task</button>
        </form>
      </div>



    </div>
  );
}

export default App;
