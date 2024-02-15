import React, { useState } from 'react';
import { auth ,createUserWithEmailAndPassword, provider, signInWithPopup, signOut, signInWithEmailAndPassword } from './config/firebase';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [ password, setPassword ] = useState("");

    const signIn = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                localStorage.setItem("user", userCredential.user);
            })
            .catch((error) => {
                alert(error);
            })
    }

    const login = async () => {
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            localStorage.setItem("user", userCredential.user);
        })
        .catch((error) => {
            alert(error);
        })
    }

    const signInWithgooogle = () => {
        signInWithPopup(auth, provider)
            .then((userCredential) => {
                localStorage.setItem("user", userCredential)
            })
            .catch((error) => {
                alert(error)
            })

    }

    const logout = async () => {
        await signOut(auth)
            .then(() => {
                localStorage.setItem("user", "")
            })
            .catch((error) => {
                alert(error)
            })
    }
  return (
    <div>
        <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
        <input type="submit" onClick={signIn}/>
        <button onClick={login}>Login</button>
        <button onClick={signInWithgooogle}>Sign in with Google</button>
        <button onClick={logout}>Log Out</button>
    </div>
  )
}

export default Auth