import './App.css' 

function App() {
return(
  <div className='app-wrapper'>
    <TodoHead/>
    <TodoButtonsFilter/>
    <TodoBody/>
  </div>
);
}

function TodoHead(){
  return(
    <div className='wrapper-todo-head-childs'>
       <input type='text' placeholder='Add new todo...' className='input-field'/>
       <select className='wrapper-todo-head-childs-select'>
       <option value="urgent">Urgent</option>
       <option value="medium" selected>Medium</option>
       <option value="low">Low</option>
       </select>
       <button type='button' className='wrapper-todo-head-childs-addbtn'>Add</button>
    </div>
  );
}
function TodoButtonsFilter(){
  return(
    <div>
     <div>
        <button type='button'>All</button>
        <button type='button'>Urgent</button>
        <button type='button'>Medium</button>
        <button type='button'>Low</button>
     </div>
     <button>Finish selectionned todos</button>
    </div>
  );
}
function TodoBody(){
  return(
    <div>
      <ul>
        <li>Learn react.js</li>
      </ul>
    </div>
  );
}
export default App
