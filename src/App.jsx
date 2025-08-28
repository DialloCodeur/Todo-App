import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useState } from 'react';
import './App.css' ;
import {useFetch} from "./hooks/useFetch.js";


function App() {
  /*const {loadings, datas, errors} = useFetch("https://jsonplaceholder.typicode.com/todos?_limit=10&_delay=5000");*/ 

  const [input, setInput] = useState("");

  const [inputedTodos, setInputedTodos] = useState([]);

  const handleAddTodo = () => {
    if(input.trim() === '') return; 
    setInputedTodos([input, ...inputedTodos]); //I write it so because with react.js it's not possible to do mutation with arrays and objects
    setInput("");
  }

  const updateTodos = () => {
    if(inputedTodos.length === 0) return;
    setInputedTodos([...inputedTodos, inputedTodos.filter(todo => todo.length > 3)]);

  }

  /*if(loadings) return <p style={{color: "white"}}>Loading...</p>;
  if(errors) return <p>{errors}</p>;*/ 

return(
  <div className='app-wrapper'> 
    <TodoHead 
    value={input} 
    onInputChange={setInput} 
    onInputedTodosChange={handleAddTodo}
    />
    <TodoButtonsFilter/>
    <TodoBody 
    //todos={datas}
    inputedTodos={inputedTodos}
    updateTodos={updateTodos}
    />
  </div>
);
}

function TodoHead({value, onInputChange, onInputedTodosChange}){
  return(
    <div className='wrapper-todo-head-childs'>
      <input type='text' placeholder='Add new todo...' className='input-field' value={value} onChange={e => onInputChange(e.target.value)} onKeyDown={e => e.key === 'Enter' && onInputedTodosChange()}/>
      <select className='wrapper-todo-head-childs-select' defaultValue={"medium"}>
       <option value="urgent">Urgent</option>
       <option value="medium">Medium</option>
       <option value="low">Low</option>
       </select>
      <button type='button' className='wrapper-todo-head-childs-addbtn' onClick={onInputedTodosChange}>Add</button> 
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
function TodoBody({/*todos*/ inputedTodos, updateTodos}){
  //console.log(inputedTodos);
  //const fetchedTodos = todos.map(todo => (todo.title))
  //let arrayOfTodos = [...inputedTodos, ...fetchedTodos]
  //console.log(arrayOfTodos.length);
  //console.log(arrayOfTodos);
  return(
    <div style={{paddingLeft: "50px", marginTop: "0"}} className="todos-wrapper">
      {inputedTodos.map(todo => (
        <h1 key={inputedTodos.indexOf(todo)} className="todo">
          <input type="checkbox"/>
          {todo}
          <button className="delete-button"><FontAwesomeIcon icon={faTrashCan} onClick={updateTodos}/></button>
        </h1>
      ))}
    </div>
  );
}
export default App
