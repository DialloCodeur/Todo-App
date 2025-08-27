import { useState } from 'react';
import './App.css' ;
import {useFetch} from "./hooks/useFetch.js";

function App() {
  const {loadings, datas, errors} = useFetch("https://jsonplaceholder.typicode.com/todos?_limit=10&_delay=5000");

  const [input, setInput] = useState('');

  const [inputedTodo, setInputedTodo] = useState('Read Quran');

  const handleAdd = (todo) => {
    setInputedTodo(todo);
  }

  if(loadings) return <p style={{color: "white"}}>Loading...</p>;
  if(errors) return <p>{errors}</p>;

return(
  <div className='app-wrapper'> 
    <TodoHead 
    value={input} 
    onInputChange={setInput} 
    onInputedTodoChange={handleAdd}/>
    <TodoButtonsFilter/>
    <TodoBody 
    todos={datas}
    inputedTodo={inputedTodo}
    />
  </div>
);
}

function TodoHead({value, onInputChange, onInputedTodoChange}){
  return(
    <div className='wrapper-todo-head-childs'>
       <input type='text' placeholder='Add new todo...' className='input-field' value={value} onChange={e => onInputChange(e.target.value)} />
       <select className='wrapper-todo-head-childs-select'>
       <option value="urgent">Urgent</option>
       <option value="medium" selected>Medium</option>
       <option value="low">Low</option>
       </select>
       <button type='submit' className='wrapper-todo-head-childs-addbtn' onClick={onInputedTodoChange}>Add</button> 
    </div>
  );
}
function TodoButtonsFilter(){
  return(
    <div className='wrapper-todo-buttons-filter-childs'>
      <button type='button' className='wrapper-todo-buttons-filter-childs-all-allbtn'>All</button>
      <button type='button' className='wrapper-todo-buttons-filter-childs-urgentbtn'>Urgent</button>
      <button type='button' className='wrapper-todo-buttons-filter-childs-mediumbtn'>Medium</button>
      <button type='button' className='wrapper-todo-buttons-filter-childs-lowbtn'>Low</button>
     <button className='wrapper-todo-buttons-filter-childs-finishbtn'>Finish selectionned todos</button>
    </div>
  );
}
function TodoBody({todos, inputedTodo}){
  console.log(inputedTodo)
  return(
    <div style={{paddingLeft: "50px", marginTop: "0"}}>
      <h1>{inputedTodo}</h1>
      {todos.map(todo => (
        <h1 key={todo.id}>{todo.title}</h1>
      ))}
    </div>
  );
}
export default App
