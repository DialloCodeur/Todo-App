import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useState } from 'react';
import './App.css' ;
import {useFetch} from "./hooks/useFetch.js";

//TODO: Set button opacity to 0.2 after finished todos disappear


function App() {
  const [input, setInput] = useState("");

  const [displayedTodos, setDisplayedTodos] = useState([]);

  const [allTodos, setAllTodos] = useState([]);

  const [checkedItems, setCheckedItems] = useState({});

  const [priority, setPriority] = useState('');

  const handleAddTodo = () => {
    if(input.trim() === '') return; 
    setDisplayedTodos([{id: Date.now(), text: input, priority: priority ? priority : "medium"}, ...displayedTodos]); //I write it so because with react.js it's not possible to mutate arrays and objects
    setAllTodos([{id: Date.now(), text: input, priority: priority ? priority : "medium"}, ...allTodos])
    setInput(""); 
  }

  const updateTodos = (id) => {
    setDisplayedTodos(displayedTodos.filter(todo => todo.id.toString() !== id));// Here it's not necessary to use the spread operator because filter returns a new array (a shallow copy) and does not mutate inputedTodos.
    setAllTodos(allTodos.filter(todo => todo.id.toString() !== id));
  }

  const handleFinishedbtnOpacity = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id] //Use id as a key and set its value to the opposite of the previous one
    }))
  }
  const isAllCheckboxesUnchecked = Object.values(checkedItems).every((item) => item === false);

  const displayTodosDependingOnPriority = (priority) => {
    if(allTodos.length === 0) return;
    if(priority === null){ 
      return setDisplayedTodos(allTodos);
    }
    console.log(allTodos);
    setDisplayedTodos(allTodos.filter(todo => todo.priority.toLowerCase() === priority.toLowerCase()));
  }

  const handleFinishedTodos = () => {
    const checkedIds = Object.keys(checkedItems).filter(id => checkedItems[id]);
    setDisplayedTodos(prevTodos => prevTodos.filter(
      todo => !checkedIds.includes(todo.id.toString())
    ));
    setAllTodos(prevTodos => prevTodos.filter(
      todo => !checkedIds.includes(todo.id.toString())
    ));
  }

return(
  <div className='app-wrapper'> 
    <TodoHead 
    value={input} 
    onInputChange={setInput} 
    handleAddTodo={handleAddTodo}
    priority={priority}
    onPriorityChange={setPriority}
    />
    <TodoButtonsFilter
    isAllCheckboxesUnchecked={isAllCheckboxesUnchecked}
    displayTodosDependingOnPriority={displayTodosDependingOnPriority}
    handleFinishedTodos={handleFinishedTodos}
    />
    <TodoBody 
    displayedTodos={displayedTodos}
    updateTodos={updateTodos}
    checkedItems={checkedItems}
    handleFinishedbtnOpacity={handleFinishedbtnOpacity}
    priority={priority}
    />
  </div> 
);
}

function TodoHead({value, onInputChange, handleAddTodo, priority, onPriorityChange}){
  return(
    <div className='wrapper-todo-head-childs'>
      <input type='text' placeholder='Add new todo...' className='input-field' value={value} onChange={e => onInputChange(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddTodo()}/>
      <select className='wrapper-todo-head-childs-select' value={priority ? priority : "medium"} onChange={e => onPriorityChange(e.target.value)}>
       <option value="medium">Medium</option>
       <option value="urgent">Urgent</option>
       <option value="low">Low</option>
       </select>
      <button type='button' className='wrapper-todo-head-childs-addbtn' onClick={handleAddTodo}>Add</button> 
    </div>
  );
}
function TodoButtonsFilter({isAllCheckboxesUnchecked, displayTodosDependingOnPriority, handleFinishedTodos}){
  return(
    <div className='wrapper-todo-buttons-filter-childs'>
      <button type='button' className='wrapper-todo-buttons-filter-childs-all-allbtn' onClick={() => displayTodosDependingOnPriority(null)}>All</button>
      <button type='button' className='wrapper-todo-buttons-filter-childs-urgentbtn' onClick={() => displayTodosDependingOnPriority('urgent')}>Urgent</button>
      <button type='button' className='wrapper-todo-buttons-filter-childs-mediumbtn' onClick={() => displayTodosDependingOnPriority('medium')}>Medium</button>
      <button type='button' className='wrapper-todo-buttons-filter-childs-lowbtn' onClick={() => displayTodosDependingOnPriority('low')}>Low</button>
      <button className='wrapper-todo-buttons-filter-childs-finishbtn'style={{opacity: isAllCheckboxesUnchecked ? 0.2 : 1, ...(!isAllCheckboxesUnchecked && {backgroundColor: "rgb(52, 175, 175)"})}} onClick={handleFinishedTodos}>Finish selectionned todos</button> 
    </div>
  );
}
function TodoBody({displayedTodos, updateTodos, handleFinishedbtnOpacity, checkedItems}){
  return(
    <div style={{paddingLeft: "50px", marginTop: "0"}} className="todos-wrapper">
      {displayedTodos.map((todo, index) => ( 
        <h1 key={todo.id} className="todo">
          <input name={todo} key={index} type="checkbox" checked={!!checkedItems[todo.id]} onChange={() => handleFinishedbtnOpacity(todo.id)}/>
          {todo.text}  <span className={todo.priority ? todo.priority.toLowerCase() : "medium"}>{todo.priority ? todo.priority : "medium"}</span>
          <button className="delete-button" onClick={() => updateTodos(todo.id)}><FontAwesomeIcon icon={faTrashCan}/></button>
        </h1>
      ))}
    </div>
  );
}
export default App  
