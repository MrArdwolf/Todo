import { useEffect, useState } from 'react'
import Router from 'next/router'
import axios from 'axios';
import Cookies from 'js-cookie';

const backendUrl = 'http://localhost:1337';

export default function ResetPassword() {

    const [userNewPassword, setUserNewPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [resetCode, setResetCode] = useState('')

    useEffect(() => {
        
        const queryParams = new URLSearchParams(window.location.search)
        setResetCode(queryParams.get("code"))

    }, []);

    const setNewPassword = () => {

        console.log(resetCode);
        console.log(userNewPassword);
        console.log(confirmPassword);

        axios
            .post(`${backendUrl}/api/auth/reset-password`, {
                code: resetCode, // code contained in the reset link of step 3.
                password: userNewPassword,
                passwordConfirmation: confirmPassword,
            })
            .then(response => {
                console.log("Your user's password has been reset.");
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
                            <h1 className="p-2 text-gray-950">Att Göra Lista</h1>
                            <div className="float-left mt-4 ml-7 ">
                                <h1 className="p-2 text-gray-950 object-top	">Återställ Lösenord</h1>

                                <input
                                    type="tex"
                                    className="shadow appearance-none border-2 rounded max-w-xl py-2 px-3 mr-2 mt-5 text-gray-900"
                                    placeholder="Password"
                                    onChange={e => setUserNewPassword(e.target.value)}
                                    value={userNewPassword}

                                />
                                <input
                                    type="tex"
                                    className="shadow appearance-none border-2 rounded max-w-xl py-2 px-3 mr-2 mt-5 text-gray-900"
                                    placeholder="Confirm Password"
                                    onChange={e => setconfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setNewPassword();
                                        }
                                    }}

                                />
                                <button id='login_button' onClick={() => setNewPassword()} className="flex-none p-2 mr-7 border-2 rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600">Återställ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )

}