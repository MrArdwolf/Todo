import { useState } from 'react'
import Router from 'next/router'
import axios from 'axios';
import Cookies from 'js-cookie';

const backendUrl = 'http://localhost:1337';

export default function ForgottenPassword() {

    const [Email, setEmail] = useState('')

    const emailRequest = () => {
        axios
            .post(`${backendUrl}/api/auth/forgot-password`, {
                email: Email, // user's email
            })
            .then(response => {
                console.log('Your user received an email');
                Router.push('/');
            })
            .catch(error => {
                console.log('An error occurred:', error.response);
            });
    }

    return (
        <>
            <main>
                <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                    <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-3xl">
                        <div className="mb-4">
                            <h1 className="p-2 text-gray-950 cursor-pointer	" onClick={() => Router.push('/')}>Att Göra Lista</h1>
                            <div className="float-left mt-4 ml-7 ">
                                <h1 className="p-2 text-gray-950 object-top	">Glömt Lösenord?</h1>

                                <input
                                    type="tex"
                                    className="shadow appearance-none border-2 rounded max-w-xl py-2 px-3 mr-2 mt-5 text-gray-900"
                                    placeholder="Email"
                                    onChange={e => setEmail(e.target.value)}
                                    value={Email}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            emailRequest();
                                        }
                                    }}

                                />
                                <button id='login_button' onClick={() => emailRequest()} className="flex-none p-2 mr-7 border-2 rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600">Skicka</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )

}