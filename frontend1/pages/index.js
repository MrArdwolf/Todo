import { useState } from 'react'
import Router from 'next/router'
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Login() {

    const [regUsername, setRegUsername] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regPassword, setRegPassword] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleRegister() {
        let token;
        let userId = {};
        axios
            .post('http://localhost:1337/auth/local/register', {
                username: regUsername,
                email: regEmail,
                password: regPassword,
            })
            .then(response => {
                token = response.data.jwt;
                Cookies.set('token', token);
                userId = response.data.user.id;
                Cookies.set('userId', userId);
                Router.push('/list');
            })
            .catch(error => {
                console.error('An error occurred:', error.response);
                alert("Ett fel uppstod!")
            });
    }


    function handleLogin() {
        let token;
        let userId = {};
        axios
            .post('http://localhost:1337/auth/local', {
                identifier: username,
                password: password,
            })
            .then(response => {
                token = response.data.jwt;
                Cookies.set('token', token);
                userId = response.data.user.id;
                Cookies.set('userId', userId);
                Router.push('/list');
            })
            .catch(error => {
                console.error('An error occurred:', error.response);
                alert("Ett fel uppstod!")
            });
    }

    function handleproviderlogin(props) {

        Cookies.set('provider', props);
        axios
            .get(`http://localhost:1337/connect/${props}`)
            .then(response => {
                console.log(response);
            })
    }

    return (
        <>
            <main>
                <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                    <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-3xl">
                        <div className="mb-4">
                            <h1 className="p-2 text-grey-darkest">Att Göra Lista</h1>
                            <div className="float-left mt-4 ml-7">
                                <h1 className="text-grey-darkest">Logga In</h1>
                                <input
                                    type="tex"
                                    className="shadow appearance-none border-2 rounded max-w-xl py-2 px-3 mr-2 mt-5 text-grey-darker"
                                    placeholder="Användarnamn"
                                    onChange={e => setUsername(e.target.value)}
                                    value={username}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleLogin();
                                        }
                                    }}

                                />
                                <br></br>
                                <input
                                    type="password"
                                    className="shadow appearance-none border-2 rounded max-w-xl py-2 px-3 mr-2 my-5 text-grey-darker"
                                    placeholder="Lösenord"
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleLogin();
                                        }
                                    }}

                                />
                                <br></br>
                                <button id='login_button' onClick={() => handleLogin()} className="flex-none p-2 mr-7 border-2 rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600">Logga in</button>
                            </div>

                            <div className=" float-right mt-4 mr-7">
                                <h1 className="text-grey-darkest">Registrera</h1>
                                <input
                                    type="tex"
                                    className="shadow appearance-none border-2 rounded max-w-xl py-2 px-3 mr-2 mt-5 text-grey-darker"
                                    placeholder="Användarnamn"
                                    onChange={e => setRegUsername(e.target.value)}
                                    value={regUsername}
                                />
                                <br></br>
                                <input
                                    type="email"
                                    className="shadow appearance-none border-2 rounded max-w-xl py-2 px-3 mr-2 my-5 text-grey-darker"
                                    placeholder="Email"
                                    onChange={e => setRegEmail(e.target.value)}
                                    value={regEmail}

                                />
                                <br></br>
                                <input
                                    type="password"
                                    className="shadow appearance-none border-2 rounded max-w-xl py-2 px-3 mr-2 mb-5 text-grey-darker"
                                    placeholder="Lösenord"
                                    onChange={e => setRegPassword(e.target.value)}
                                    value={regPassword}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleRegister();
                                        }
                                    }}
                                />
                                <br></br>
                                <button id='login_button' onClick={() => handleRegister()} className="flex-none p-2 mr-7 border-2 rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600">Registrera</button>

                            </div>
                            <div>
                                <a href={`http://localhost:1337/connect/discord`}>
                                    <button
                                        onClick={() => handleproviderlogin('discord')}
                                        className="items-center pl-2 pr-5 flex-none p-2 ml-7 mt-7 mr-7 border-2 rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600">Logga in med Discord
                                    </button>
                                </a>
                                <a href={`http://localhost:1337/connect/google`}>
                                    <button
                                        onClick={() => handleproviderlogin('google')}
                                        className="items-center flex flex-row justify-center pl-2 pr-5 flex-none p-2 ml-7 mt-7 mr-7 border-2 rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600">Logga in med Google
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
    
}