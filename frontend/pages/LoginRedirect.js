import React, { useEffect, useState } from 'react';
import Router from 'next/router'
import Cookies from 'js-cookie';

const backendUrl = 'http://localhost:1337';

const LoginRedirect = (props) => {
  const [text, setText] = useState('Loading...');
  const provider = Cookies.get('provider', props);

  // const access_token = Cookies.get('access_token');


  useEffect(() => {

    const queryParameters = new URLSearchParams(window.location.search)

    const access_token = queryParameters.toString()

    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    fetch(`${backendUrl}/api/auth/${provider}/callback?${access_token}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        Cookies.set('token', res.jwt);
        Cookies.set('userId', res.user.id);
        Cookies.set('username', res.user.username);
        setText('You have been successfully logged in. You will be redirected in a few seconds...');
        setTimeout(() => Router.push('/list'), 3000);
        //Router.push('/list');
      })
      .catch(err => {
        console.log(err);
        setText('An error occurred, please see the developer console.')
      });
  }, []);

  return (
    <p>{text}</p>
  )
};

export default LoginRedirect;
