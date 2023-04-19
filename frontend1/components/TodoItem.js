import { useState, useRef, useEffect } from "react"
import Cookies from 'js-cookie';

export default function TodoItem(props) {

    const token = Cookies.get('token');
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
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())

            .then(allTodo => {
                setChecked(allTodo.Checked);
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