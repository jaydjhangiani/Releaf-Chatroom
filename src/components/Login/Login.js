import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import {auth,provider} from '../../firebase'
import logo from '../../img/releaf.jpg'

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider)
        .catch((e) => alert(e.message));
    }

    return (
        <div className = "login">
            <div className = "login__logo">
                <img src={logo} alt="Releaf"/>
                <h1>Welcome to the Chat Room</h1>
            </div>

            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
