import { useState, useEffect } from 'react';
    import TodoItem from '@/components/TodoItem.js'
    
    function App() {
      const [todos, setTodos] = useState([]);
      const [newTodo, setNewTodo] = useState("");
    
      useEffect(() => {
        // update update the list of todos
        // when the component is rendered for the first time
        update();
      }, []);
    
      // This function updates the component with the
      // current todo data stored in the server
      function update() {
        fetch(`${process.env.REACT_APP_BACKEND}api/todos`)
          .then(res => res.json())
          .then(todo => {
            setTodos(todo.data);
          })
      }
    
      // This function sends a new todo to the server
      // and then call the update method to update the
      // component
      function addTodo(e) {
        e.preventDefault();
        let item = newTodo;
        let body = {
          data: {
            item
          }
        };
     
        fetch(`${process.env.REACT_APP_BACKEND}api/todos`, {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(body)
        })
          .then(() => {
            setNewTodo("");
            update();
          })
      }
    
      return (
        <div className="app">
          <main>
            {/* we centered the "main" tag in our style sheet*/}
    
            {/* This form collects the item we want to add to our todo, and sends it to the server */}
            <form className="form" onSubmit={addTodo}>
              <input type="text" className="todo_input" placeholder="Enter new todo" value={newTodo} onChange={e => setNewTodo(e.currentTarget.value) }/>
              <button type="submit" className="todo_button">Add todo</button>
            </form>
    
            {/* This is a list view of all the todos in the "todo" state variable */}
            <div>
              {
                todos.map((todo, i) => {
                  return <TodoItem todo={todo} key={i} update={update} />
                })
              }
            </div>
    
          </main>
        </div>
      )
    }
    export default App;



// import Script from 'next/script'
// import TodoItem from '@/components/TodoItem'
// import { useState, useRef, useEffect } from 'react'


// export default function Home() {
//   let [todos, setTodos] = useState([{
// 		"id": 7,
// 		"item": "test",
// 		"published_at": "2023-02-09T13:24:57.492Z",
// 		"created_at": "2023-02-09T13:24:57.497Z",
// 		"updated_at": "2023-02-09T13:24:57.497Z"
// 	}]);

//   let inputText = useRef(null);
//   const [newTodo, setNewTodo] = useState("");
  
//   useEffect(() => {
//     inputText.current = newTodo;
//   }, [newTodo]);


//   const addObject = () =>{
//     if(newTodo == ""){
//       alert("Du skrev inget!")
//     }else{
//     let tempTodos = [...todos];
//     tempTodos.push({
//       "id": 8,
//       "item": newTodo,
//       "published_at": "2023-02-09T13:24:57.492Z",
//       "created_at": "2023-02-09T13:24:57.497Z",
//       "updated_at": "2023-02-09T13:24:57.497Z"
//     });
//     setTodos(tempTodos);
//     resetInput();
//     console.log("fungerar1");
//     }
//   }

//   const removeObject = () =>{

//     console.log("fungerar2");
//   }

//   const resetInput = () =>{
//     setNewTodo("")
//   }
//   return (
//     <>
//       <main>
//         <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
//           <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-3xl">
//             <div className="mb-4">
//               <h1 className="text-grey-darkest">To do List</h1>
//               <div className="flex mt-4">
//                 <input 
//                 type="text" 
//                 onChange={(e) => setNewTodo(e.target.value)} 
//                 value={newTodo}
//                 id='text_input' 
//                 ref={inputText} 
//                 className="shadow appearance-none border rounded w-full py-2 px-3 mr-2 text-grey-darker" 
//                 placeholder="Att göra"
//                 />
//                 <button id='ok_button' onClick={addObject} className="flex-none p-2 ml-2 mr-2 border-2 rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600">OK</button>
//                 <button id='empty_button' onClick={resetInput} className="flex-none p-2 ml-2 border-2 rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600">ränsa</button>
//               </div>
//             </div>
//             <div id='things' className='max-h-192 overflow-auto'>
//               <ul id='list'>
//                 {todos.map((todo)=>{
//                   return <TodoItem todo={todo} />
//                 })}
//                 {/* <li className='cursor-pointer relative my-2 py-4 pr-2 pl-10 list-none bg-gray-100 text-base odd:bg-gray-200 hover:bg-gray-300'>Sak 1</li>
//                 <li className='cursor-pointer relative my-2 py-4 pr-2 pl-10 list-none bg-gray-100 text-base odd:bg-gray-200 hover:bg-gray-300'>Sak 2</li>
//                 <li className='cursor-pointer relative my-2 py-4 pr-2 pl-10 list-none bg-gray-100 text-base odd:bg-gray-200 hover:bg-gray-300'>Sak 3</li>
//                 <li className='cursor-pointer relative my-2 py-4 pr-2 pl-10 list-none bg-gray-100 text-base odd:bg-gray-200 hover:bg-gray-300'>Sak 4</li>
//                 <li className='cursor-pointer relative my-2 py-4 pr-2 pl-10 list-none bg-gray-100 text-base odd:bg-gray-200 hover:bg-gray-300'>Sak 5</li>
//                 <li className='cursor-pointer relative my-2 py-4 pr-2 pl-10 list-none bg-gray-100 text-base odd:bg-gray-200 hover:bg-gray-300'>Sak 6</li>
//                 <li className='cursor-pointer relative my-2 py-4 pr-2 pl-10 list-none bg-gray-100 text-base odd:bg-gray-200 hover:bg-gray-300'>Sak 7</li>
//                 <li className='cursor-pointer relative my-2 py-4 pr-2 pl-10 list-none bg-gray-100 text-base odd:bg-gray-200 hover:bg-gray-300'>Sak 8</li>
//                 <li className='cursor-pointer relative my-2 py-4 pr-2 pl-10 list-none bg-gray-100 text-base odd:bg-gray-200 hover:bg-gray-300'>Sak 9</li>
//                 <li className='cursor-pointer relative my-2 py-4 pr-2 pl-10 list-none bg-gray-100 text-base odd:bg-gray-200 hover:bg-gray-300'>Sak 10</li> */}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* <Script id="test">
//         {`var myNodelist = document.getElementsByTagName("LI");
//           var i;
//           for (i = 0; i < myNodelist.length; i++) {
//             var button = document.createElement("button");
//             var txt = document.createTextNode("Ta Bort");
//             button.className = "absolute top-1 bottom-1 h-auto right-1 py-3 px-4 hover:bg-red-600 hover:text-white close flex-none p-2 ml-2 border-2 rounded text-center align-middle text-red-600 border-red-600";
//             button.id = "close"
//             button.appendChild(txt);
//             myNodelist[i].appendChild(button);
//           }

//           var close = document.getElementsByClassName("close");
//           var i;
//           for (i = 0; i < close.length; i++) {
//             close[i].onclick = function() {
//               var div = this.parentElement;
//               div.remove();
//             }
//           }

//           var list = document.querySelector('ul');
//           list.addEventListener('click', function(ev) {
//             if (ev.target.tagName === 'LI') {
//               if(ev.target.className == ('cursor-pointer relative my-2 py-4 pr-2 pl-10 list-none bg-gray-100 text-base odd:bg-gray-200 hover:bg-gray-300')){
//                 ev.target.className = ('cursor-pointer relative my-2 py-4 pr-2 pl-10 list-none text-base odd:bg-gray-500 bg-gray-400 hover:bg-gray-300 text-green-500 line-through before:absolute before:border-green-500 before:border-solid before:border-r-2 before:border-b-2 before:top-4.5 before:left-4 before:origin-center before:rotate-45 before:h-4 before:w-2');
//               }else{
//                 ev.target.className = ('cursor-pointer relative my-2 py-4 pr-2 pl-10 list-none bg-gray-100 text-base odd:bg-gray-200 hover:bg-gray-300');
//               }
              
//             }
//           }, false);

//           function newElement() {
//             var li = document.createElement("li");
//             var inputValue = document.getElementById("text_input").value;
//             var t = document.createTextNode(inputValue);
//             li.className = "cursor-pointer relative my-2 py-4 pr-2 pl-10 list-none bg-gray-100 text-base odd:bg-gray-200 hover:bg-gray-300";
//             li.appendChild(t);
//             if (inputValue === '') {
//               alert("You must write something!");
//             } else {
//               document.getElementById("list").appendChild(li);
//             }
//             document.getElementById("text_input").value = "";

//             var button = document.createElement("button");
//             var txt = document.createTextNode("Ta Bort");
//             button.className = "absolute top-1 bottom-1 h-auto right-1 py-3 px-4 hover:bg-red-600 hover:text-white close flex-none p-2 ml-2 border-2 rounded text-center align-middle text-red-600 border-red-600";
//             button.appendChild(txt);
//             li.appendChild(button);

//             for (i = 0; i < close.length; i++) {
//               close[i].onclick = function() {
//                 var div = this.parentElement;
//                 div.remove();
//               }
//             }
//           }

//           document.getElementById("ok_button").onclick = newElement;
//           document.getElementById("empty_button").onclick = emptyText;

//           function emptyText(){
//           document.getElementById("text_input").value = "";
//           }

//           `}
//       </Script> */}
//     </>
//   )
// }


