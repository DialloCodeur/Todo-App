import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useState } from 'react';
import './App.css' ;
import {useFetch} from "./hooks/useFetch.js";


function App() {
  const [input, setInput] = useState("");

  const [inputedTodos, setInputedTodos] = useState([]);

  const [checkedItems, setCheckedItems] = useState({});

  const [priority, setPriority] = useState('');

  const handleAddTodo = () => {
    if(input.trim() === '') return; 
    setInputedTodos([{id: Date.now(), text: input, priority: priority}, ...inputedTodos]); //I write it so because with react.js it's not possible to mutate arrays and objects
    setInput(""); 
  }

  const updateTodos = (id) => {
    if(inputedTodos.length === 0) return;
    setInputedTodos(inputedTodos.filter(todo => todo.id !== id));// Here it's not necessary to use the spread operator because filter returns a new array (a shallow copy) and does not mutate inputedTodos.
  }

  const handleFinishedbtnOpacity = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id] //Use id as a key and set its value to the opposite of the previous one
    }))
  }
  const isAllCheckboxesUnchecked = Object.values(checkedItems).every((item) => item === false);

return(
  <div className='app-wrapper'> 
    <TodoHead 
    value={input} 
    onInputChange={setInput} 
    onInputedTodosChange={handleAddTodo}
    priority={priority}
    onPriorityChange={setPriority}
    />
    <TodoButtonsFilter
    isAllCheckboxesUnchecked={isAllCheckboxesUnchecked}
    />
    <TodoBody 
    inputedTodos={inputedTodos}
    updateTodos={updateTodos}
    checkedItems={checkedItems}
    onOpacityChange={handleFinishedbtnOpacity}
    priority={priority}
    />
  </div> 
);
}

function TodoHead({value, onInputChange, onInputedTodosChange, priority, onPriorityChange}){
  return(
    <div className='wrapper-todo-head-childs'>
      <input type='text' placeholder='Add new todo...' className='input-field' value={value} onChange={e => onInputChange(e.target.value)} onKeyDown={e => e.key === 'Enter' && onInputedTodosChange()}/>
      <select className='wrapper-todo-head-childs-select' value={priority} onChange={e => onPriorityChange(e.target.value)}>
       <option value="medium">Medium</option>
       <option value="urgent">Urgent</option>
       <option value="low">Low</option>
       </select>
      <button type='button' className='wrapper-todo-head-childs-addbtn' onClick={onInputedTodosChange}>Add</button> 
    </div>
  );
}
function TodoButtonsFilter({isAllCheckboxesUnchecked}){
  return(
    <div className='wrapper-todo-buttons-filter-childs'>
      <button type='button' className='wrapper-todo-buttons-filter-childs-all-allbtn'>All</button>
      <button type='button' className='wrapper-todo-buttons-filter-childs-urgentbtn'>Urgent</button>
      <button type='button' className='wrapper-todo-buttons-filter-childs-mediumbtn'>Medium</button>
      <button type='button' className='wrapper-todo-buttons-filter-childs-lowbtn'>Low</button>
      <button className='wrapper-todo-buttons-filter-childs-finishbtn'style={{opacity: isAllCheckboxesUnchecked ? 0.2 : 1, ...(!isAllCheckboxesUnchecked && {backgroundColor: "rgb(52, 175, 175)"})}}>Finish selectionned todos</button>
    </div>
  );
}
function TodoBody({inputedTodos, updateTodos, onOpacityChange, checkedItems}){
  return(
    <div style={{paddingLeft: "50px", marginTop: "0"}} className="todos-wrapper">
      {inputedTodos.map((todo, index) => ( 
        <h1 key={todo.id} className="todo">
          <input name={todo} key={index} type="checkbox" checked={!!checkedItems[todo.id]} onChange={() => onOpacityChange(todo.id)}/>
          {todo.text}  <span className={todo.priority ? todo.priority.toLowerCase() : "medium"}>{todo.priority.toLowerCase() ? todo.priority : "medium"}</span>
          <button className="delete-button" onClick={() => updateTodos(todo.id)}><FontAwesomeIcon icon={faTrashCan}/></button>
        </h1>
      ))}
    </div>
  );
}
export default App  
