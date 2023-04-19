import TodoItem from '@/components/TodoItem'
import React, { useState, useRef, useEffect } from 'react'
import Router from 'next/router'
import Cookies from 'js-cookie';



export default function Home() {

  const userId = Cookies.get('userId');
  const token = Cookies.get('token');

  let [todos, setTodos] = useState([]);

  let inputText = useRef(null);
  const [newTodo, setNewTodo] = useState("");


  //useEffect körs om man laddar om sidan och i detta fall så kör useEffect funktionen update.
  useEffect(() => {
    update();
  }, []);

  // update häntar alla todos från databasen och lägger dem i en array.
  const update = () => {

    if (token != "") {

      fetch(`http://localhost:1337/todos?owner.id=${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(allTodo => {
          setTodos(allTodo);
        })
        .catch((e) => {
          console.error(`An error occurred: ${e}`)
          alert("Ett fel uppstod!")
        });
    } else {
      Router.push('/');
    }


  }

  // addObject körs när man klickar på enter eller ok knappen och den tar det man skrev och skapar en ny todo sedan kör den update för att man ska knna se den man nyss skapade.
  const addObject = () => {
    if (token != "") {
      if (newTodo == "") {
        alert("Du skrev inget!")
      } else {
        let body = {
          item: newTodo
        };

        fetch(`http://localhost:1337/todos`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json'
          },
          body: JSON.stringify(body)
        })
          .then(() => {
            resetInput()
            update();
          })
          .catch((e) => {
            console.error(`An error occurred: ${e}`)
            alert("Ett fel uppstod!")
          });
      }
    }
  }

  // removeObject körs när man klicka på ta bort knappen för var var och en todo. det påverkar bara den som man klickade på.
  const removeObject = (_item) => {
    let pos = _item.id;


    fetch(`http://localhost:1337/todos/${pos}`, {
      method: "DELETE"
    })
      .then(() => {
        update();
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`)
        alert("Ett fel uppstod!")
      });
  }

  // resetInput körs när man klickar på ränsa knappen eller är man skapa en ny todo och den ränsar input fältet.
  const resetInput = () => {
    setNewTodo("")
  }

  // RemoveAllObjects körs när man klickar på ta bort alla knappen och det kör en for loop på arrayn och säger till removeObject att ta bort alla.
  const removeAllObjects = () => {
    if (confirm("Press a button!") == true) {
      for (let i = 0; i < todos.length; i++) {
        let pos = todos[i].id;
        removeObject(todos[i]);
      }
    }
  }

  const logOut = () => {
    Cookies.set('token', '');
    //Cookies.remove('token');
  }

  return (
    <>
      <main>
        <div className="h-screen w-full flex items-center justify-center bg-teal-lightest font-sans">
          <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-3xl">
            <div className="mb-4">
              <button id='logout_button' onClick={() => Router.push('/') + logOut()} className="flex-none float-right p-2 ml-2 mr-2 border-2 rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600">Logga Ut</button>
              <h1 className="p-2 text-grey-darkest">Att Göra Lista</h1>
              <div className="flex mt-4">
                <input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addObject();
                    }
                  }}
                  type="text"
                  onChange={(e) => setNewTodo(e.target.value)}
                  value={newTodo}
                  id='text_input'
                  ref={inputText}
                  className="shadow appearance-none border rounded w-full py-2 px-3 mr-2 text-grey-darker"
                  placeholder="Att göra"
                />
                <button id='ok_button' onClick={addObject} className="flex-none p-2 ml-2 mr-2 border-2 rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600">OK</button>
                <button id='empty_button' onClick={resetInput} className="flex-none p-2 ml-2 border-2 rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600">ränsa</button>
              </div>
            </div>
            <div id='things' className='h-sc75 overflow-auto'>
              <ul id='list'>
                {todos.map((todo) => {
                  return <TodoItem key={todo.id} todo={todo} removeObject={removeObject} />
                })}
              </ul>
              <div>
                <button id='remove_all_button' onClick={removeAllObjects} className='flex p-3 mt-5 mr-auto ml-auto border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600'>Ta Bort Alla</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}