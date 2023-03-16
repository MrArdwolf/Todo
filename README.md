# Backend
## Installera Stapi Och PostgreSQL
1. 

## skapa en collection type För Att Gara Lista
1. starta strapi servern och logga in.
2. klicka på `Content-Types Builder` och `Create new collection type`.
3. under `Display name` skriv: `Todo` och klicka på `Continue`.
4. klicka sedan på `Text`, döp den till: `item`, och klicka på `Add another field`.
5. klicka sedan på `Boolean`, döp den till: `Checked`, klicka på `ADVANCED SETTNGS`, sätt `Default value` till: `FALSE`, klicka på `Finish` och klicka på Save.
6. klicka på `Settings`, klicka på `Roles` under `USERS & PERMISSIONS PLUGIN`och klicka på `Public`.
7. under `Permissions` och `APPLICATION` klicka i `delete`, `findone`, `crreate`, `find`, `update` och klicka på Save.

# Frontend
## installera next.js och react
1. För att installer next.js och react så ska man starta en terminal i project mappen ock köra:
    ```
    yarn create next-app .
    ```
2. välja vad man ska ha i sitt projekt
- Typescript = No
- ESLint = No
- `src/` directory = No
- experimental `app/` directory = No

## Installera Tailwind CSS
1. För att installera Tailwind CSS så ska man köra:
    ```
    yarn add -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p -full
    ```
2. Ändra namnet på `-u` till `tailwind.config.js` och byta ut content i `tailwind.config.js` till
    ```js
      content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    ```
## Byta Ut Filer
1. öppna `pages/index.js` och ersätt allt med:
    ```js
    import { Inter } from '@next/font/google'

    const inter = Inter({ subsets: ['latin'] })

    export default function Home() {
        return (
            <main>
                <p className='text-blue-600'>Hello World!</p>
            </main>
        )
    }
    ```
2. ta bort `styles/Home.module.css` och öppna `styles/globals.css`. ersätt sedan allt med:
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
## Starta Hemsidan
1. för att starta hemsidan kör:
    ```
    yarn dev
    ```
## Kod För Att Göra Lista
### `index.js`
```js
import TodoItem from '@/components/TodoItem'
import { useState, useRef, useEffect } from 'react'
import React from "react";


export default function Home() {

  let [todos, setTodos] = useState([]);

  let inputText = useRef(null);
  const [newTodo, setNewTodo] = useState("");


  //useEffect körs om man laddar om sidan och i detta fall så kör useEffect funktionen update.
  useEffect(() => {
    update();
  }, []);

  // update häntar alla todos från databasen och lägger dem i en array.
  const update = () => {
    fetch(`http://localhost:1337/todos`)
      .then(res => res.json())
      .then(allTodo => {
        setTodos(allTodo);
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`)
        alert("Ett fel uppstod!")
      });
  }

  // addObject körs när man klickar på enter eller ok knappen och den tar det man skrev och skapar en ny todo sedan kör den update för att man ska knna se den man nyss skapade.
  const addObject = () => {
    if (newTodo == "") {
      alert("Du skrev inget!")
    } else {
      let body = {
        item: newTodo
      };

      fetch(`http://localhost:1337/todos`, {
        method: "POST",
        headers: {
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
    for (let i = 0; i < todos.length; i++) {
      let pos = todos[i].id;
      removeObject(todos[i]);
    }
  }

  return (
    <>
      <main>
        <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
          <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-3xl">
            <div className="mb-4">
              <h1 className="text-grey-darkest">To do List</h1>
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
            <div id='things' className='max-h-192 overflow-auto'>
              <ul id='list'>
                {todos.map((todo) => {
                  return <TodoItem todo={todo} removeObject={removeObject} />
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
```

### `Todoitem.js`
```js
import { useState, useRef, useEffect } from "react"

export default function TodoItem(props) {
    const [isChecked, setChecked] = useState(false);
    let listItem = useRef(null);
    const id = props.todo.id;

    useEffect(() => {
        update();
    }, []);

    const update = () => {
        setChecked(props.todo.Checked);
    }

    // toggleClass körs när man klickar på en todo och den ändrar hur en todo ser ut.
    const toggleClass = () => {
        fetch(`http://localhost:1337/todos/${id}`, {
            method: `PUT`,
            body: JSON.stringify({
                Checked: !isChecked
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())

            .then(allTodo => {
                setChecked(allTodo.Checked);
                console.log(allTodo);
            })
            .catch((e) => {
                console.error(`An error occurred: ${e}`)
                alert("Ett fel uppstod!")
            });

    };

    // removeTodo körs när man klicka på ta bort knappen på var todo och den kör removeObject i index.js
    const removeTodo = (e) => {
        e.stopPropagation();
        props.removeObject(props.todo);
    }

    return (
        <li key={id} ref={listItem} onClick={toggleClass} className={`cursor-pointer relative my-2 py-4 pr-2 pl-10 list-none text-base ${isChecked ? "bg-gray-400 odd:bg-gray-500 hover:bg-gray-300 odd:text-gray-400 text-gray-500 line-through before:absolute odd:before:border-gray-400 before:border-gray-500 before:border-solid before:border-r-2 before:border-b-2 before:top-4.5 before:left-4 before:origin-center before:rotate-45 before:h-4 before:w-2" : "bg-gray-100 odd:bg-gray-200 hover:bg-gray-300"}`}>
            {props.todo.item}

            <button onClick={removeTodo} className={`absolute top-1 bottom-1 h-auto right-1 py-3 px-4  hover:text-white close flex-none p-2 ml-2 border-2 rounded text-center align-middle  ${isChecked ? "hover:bg-red-500 text-red-500 border-red-500" : "hover:bg-red-600 text-red-600 border-red-600"}`}>Ta Bort</button>
        </li>


    )
}
```


