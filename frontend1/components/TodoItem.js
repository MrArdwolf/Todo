import { useState } from "react";

function TodoItem({ todo, update }) {
 
  // Our component uses the "edit" state
  // variable to switch between editing
  // and viewing the todo item
  const [edit, setEdit] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  // This function changes the to-do that
  // is rendered in this component.
  // This function is called when the
  // form to change a todo is submitted
  function changeTodo(e) {
    e.preventDefault();
    let item = newTodo;
    let pos = todo.id;
    let body = {
      data: {
        item
      }
    };

    fetch(`${process.env.REACT_APP_BACKEND}api/todos/${pos}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(() => {
        setEdit(false);
        update();
      })
  }

  // This function deletes the to-do that
  // is rendered in this component.
  // This function is called when the
  // form to delete a todo is submitted
  function deleteTodo(e) {
    e.preventDefault();
    let pos = todo.id;
 
    fetch(`${process.env.REACT_APP_BACKEND}api/todos/${pos}`, {
      method: "DELETE"
    })
      .then(() => {
        update();
      })
  }

  return <div className="todo">
    {/*
      The below toggles between two components
      depending on the current value of the "edit"
      state variable
    */}
    { !edit
        ? <div className="name">{todo.attributes.item}</div>
        : <form onSubmit={changeTodo}>
            <input className="todo_input" type="text" placeholder="Enter new todo" value={newTodo} onChange={e => setNewTodo(e.currentTarget.value)} />
            <button className="todo_button" type="submit">Change todo</button>
          </form>
    }
    <div>
      <button className="delete" onClick={deleteTodo}>delete</button>
      <button className="edit" onClick={() => {
        // this button toggles the "edit" state variable
        setEdit(!edit)

        // we add this snippet below to make sure that our "input"
        // for editing is the same as the one for the component when
        // it is toggled. This allows anyone using it to see the current
        // value in the element, so they don't have to write it again
        setNewTodo(todo.attributes.item)
      }}>edit</button>
    </div>
  </div>
}

export default TodoItem;



// import { useState, useRef } from "react"
// import { removeObject } from '@/pages/index.js'

// function TodoItem(props){
//     const [isChecked, setChecked] = useState(false);
//     let listItem = useRef(null);

//     const toggleClass = () => {
//         setChecked(!isChecked);
//     };

//     const removeTodo = () => {
        
//     }
    

//     return(
//         <li ref={listItem} onClick={toggleClass} className={`cursor-pointer relative my-2 py-4 pr-2 pl-10 list-none text-base ${isChecked ? "bg-gray-400 odd:bg-gray-500 hover:bg-gray-300 odd:text-gray-400 text-gray-500 line-through before:absolute odd:before:border-gray-400 before:border-gray-500 before:border-solid before:border-r-2 before:border-b-2 before:top-4.5 before:left-4 before:origin-center before:rotate-45 before:h-4 before:w-2" : "bg-gray-100 odd:bg-gray-200 hover:bg-gray-300"}`}> 
//             {props.todo.item}
            
//         <button onClick={removeTodo} className = "absolute top-1 bottom-1 h-auto right-1 py-3 px-4 hover:bg-red-600 hover:text-white close flex-none p-2 ml-2 border-2 rounded text-center align-middle text-red-600 border-red-600">Ta Bort</button>
//         </li>


//     )
// }

// export default TodoItem;