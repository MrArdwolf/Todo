import { useState } from 'react'
import Router from 'next/router'
import axios from 'axios';
import Cookies from 'js-cookie';

const backendUrl = 'http://localhost:1337';

export default function Login() {

    const [regUsername, setRegUsername] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regPassword, setRegPassword] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    let register = false;

    function handleRegister() {
        let token;
        let userId = {};
        axios
            .post(`${backendUrl}/api/auth/local/register`, {
                username: regUsername,
                email: regEmail,
                password: regPassword,
            })
            .then(response => {
                token = response.data.jwt;
                Cookies.set('token', token);
                userId = response.data.user.id;
                Cookies.set('userId', userId);
                Cookies.set('username', response.data.user.username);
                Router.push('/list');
            })
            .catch(error => {
                if (error.status !== 400) {
                    console.error(`Couldn't login to Strapi. Status: ${error.response.status}`);
                    alert("Email eller Användarnamn används till ett anat konto")
                }
                else {
                    console.error('An error occurred:', error.response);
                    alert("Ett fel uppstod!")

                }
            });
    }


    function handleLogin() {
        let token;
        let userId = {};
        axios
            .post(`${backendUrl}/api/auth/local`, {
                identifier: username,
                password: password,
            })
            .then(response => {
                token = response.data.jwt;
                Cookies.set('token', token);
                userId = response.data.user.id;
                Cookies.set('userId', userId);
                Cookies.set('username', response.data.user.username);
                Router.push('/list');
            })
            .catch(error => {


                if (error.status !== 400) {
                    console.error(`Couldn't login to Strapi. Status: ${error.response.status}`);
                    alert("fel inloggningsuppgifter")
                }
                else {
                    console.error('An error occurred:', error.response);
                    alert("Ett fel uppstod!")

                }
            });
    }

    function handleproviderlogin(props) {

        Cookies.set('provider', props);
        axios
            .get(`${backendUrl}/api/connect/${props}`)
            .then(response => {
                console.log(response);
            })
    }

    if (register == false) {
        return (
            <>
                <main>
                    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-3xl">
                            <div className="mb-4">
                                <h1 className="p-2 text-gray-950 cursor-pointer	" onClick={() => Router.push('/')}>Att Göra Lista</h1>
                                <div className="grid my-4 mx-7 justify-items-center">
                                    <div className='flex justify-between'>
                                        <h1 className="text-gray-950 mr-14 font-medium">Logga In</h1>
                                        <a className="text-gray-950 ml-14 cursor-pointer font-light" onClick={() => Router.push('/Register')}>Inget Konto?</a>
                                    </div>
                                    <input
                                        type="tex"
                                        className="shadow appearance-none border-2 rounded max-w-xl py-2 px-3  mt-5 text-gray-900 "
                                        placeholder="Användarnamn/Email"
                                        onChange={e => setUsername(e.target.value)}
                                        value={username}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleLogin();
                                            }
                                        }}

                                    />
                                    <input
                                        type="password"
                                        className="shadow appearance-none border-2 rounded max-w-xl py-2 px-3  my-5 text-gray-900"
                                        placeholder="Lösenord"
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleLogin();
                                            }
                                        }}

                                    />
                                    <div className='flex justify-center'>
                                        <button id='login_button' onClick={() => handleLogin()} className="flex-none p-2 border-2 rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600">Logga in</button>
                                    </div>
                                </div>


                                <div className='grid justify-items-center'>
                                    <a>---------------------- Eller ----------------------</a>
                                    <a href={`${backendUrl}/api/connect/discord`}>
                                        <button
                                            onClick={() => handleproviderlogin('discord')}
                                            className="items-center px-5 flex-none py-2 ml-x mb-2 mt-4 border-2 rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600">Fortsätt med Discord
                                        </button>
                                    </a>
                                    <a href={`${backendUrl}/api/connect/google`}>
                                        <button
                                            onClick={() => handleproviderlogin('google')}
                                            className="items-center flex flex-row justify-center px-5 flex-none py-2 ml-x mt-2 border-2 rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600">Fortsätt med Google
                                        </button>
                                    </a>
                                    <a id='ForgottenPassword' onClick={() => Router.push('/ForgottenPassword')} className="flex-none mt-3 p-2 rounded text-gray-950 cursor-pointer font-light">Glömt Lösenord?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
    }

    if (register == true) {
        return (
            <>
                <main>
                    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-3xl">
                            <div className="mb-4">
                                <h1 className="p-2 text-gray-950 cursor-pointer	" onClick={() => Router.push('/')}>Att Göra Lista</h1>
                                <div className=" float-right mt-4 mr-7">
                                    <h1 className="text-gray-950">Registrera</h1>
                                    <input
                                        type="tex"
                                        className="shadow appearance-none border-2 rounded max-w-xl py-2 px-3 mr-2 mt-5 text-gray-900"
                                        placeholder="Användarnamn"
                                        onChange={e => setRegUsername(e.target.value)}
                                        value={regUsername}
                                    />
                                    <br></br>
                                    <input
                                        type="email"
                                        className="shadow appearance-none border-2 rounded max-w-xl py-2 px-3 mr-2 my-5 text-gray-900"
                                        placeholder="Email"
                                        onChange={e => setRegEmail(e.target.value)}
                                        value={regEmail}

                                    />
                                    <br></br>
                                    <input
                                        type="password"
                                        className="shadow appearance-none border-2 rounded max-w-xl py-2 px-3 mr-2 mb-5 text-gray-900"
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
                                    <a href={`${backendUrl}/api/connect/discord`}>
                                        <button
                                            onClick={() => handleproviderlogin('discord')}
                                            className="items-center pl-2 pr-5 flex-none p-2 ml-7 mt-7 mr-7 border-2 rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600">Logga in med Discord
                                        </button>
                                    </a>
                                    <a href={`${backendUrl}/api/connect/google`}>
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



}