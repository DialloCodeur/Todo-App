import './App.css' 

function App() {
return(
  <>
    <TodoHead/>
    <TodoButtonsFilter/>
  </>
);
}

function TodoHead(){
  return(
    <div className='todo-head-childs'>
       <input type='text' placeholder='Add new todo...'/>
       <select>
       <option value="urgent">Urgent</option>
       <option value="medium" selected>Medium</option>
       <option value="low">Low</option>
       </select>
       <button type='button'>Add</button>
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
function TodoBody(){}
export default App
