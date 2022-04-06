import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const userInfo = localStorage.getItem('username');
    useEffect(() => {
        if (userInfo) {
            navigate("/chat")
        }
    }, [navigate, userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!(username.length > 0 &&
            email.length > 0 &&
            password === confirmPassword &&
            password.length > 0))
            return;

        const authObject = {
            'Private-Key': '1f87004e-5579-401d-9fb4-224be5928648',
            'Project-ID': '327ef6ee-a3b0-4e52-829e-9cd277e8e4a5',
            "User-Name": username,
            "User-Secret": password
        }

        const authHeader = {
            'Private-Key': '1f87004e-5579-401d-9fb4-224be5928648'
        }


        try {
            //fetch the current user if it exists
            setError(`oops, something went wrong`)
            const userExists = await axios.get('https://api.chatengine.io/users/', {
                headers: authObject
            });
            console.log('worked');
            console.log(userExists);
            // if user already exists
            if (userExists && (localStorage.getItem('username') && localStorage.getItem('username') === username)) {
                setError(`Username is taken`)
            }
            console.log('worked2');
            // if user doesnt exist, create a new user
            await axios.post('https://api.chatengine.io/users/',
                { 'username': username, 'email': email, 'secret': password }, // Body object
                { 'headers': authHeader }); // Headers object);
            // //saving user's username and password to localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            //redirecting them to the login page to login
            await registerWithEmailAndPassword(username, email, password)

        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className='wrapper'>
            <div className='form'>
                <h1 className='title'>Account Creation</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder='Username' required />
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder='Email' required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder='Password' required />
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input" placeholder='Confirm Password' required />
                    <div align="center">
                        <button type="submit" className='button'>
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    <h2 className='error'>Have an Account ? <Link to="/login">Login</Link></h2>
                    <h2 className='error'>{error}</h2>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;