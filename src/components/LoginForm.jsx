import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import { auth, logInWithEmailAndPassword, db } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [user] = useAuthState(auth);
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

        const authObject = {
            'Project-ID': "327ef6ee-a3b0-4e52-829e-9cd277e8e4a5",
            "User-Name": username,
            "User-Secret": password
        };

        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setUsername(data.username);
            await logInWithEmailAndPassword(email, password)
            await axios.get('https://api.chatengine.io/chats', { headers: authObject });
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);

            window.location.reload();

        } catch (error) {
            setError('Oops, incorrect credentials.');
        }
    }
    return (
        <div className='wrapper'>
            <div className='form'>
                <h1 className='title'>Chat Application</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder='Username' required />
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder='Email' required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder='Password' required />
                    <div align="center">
                        <button type="submit"
                                className='button'
                                onClick={() => logInWithEmailAndPassword(email, password)}>
                            <span>Login</span>
                        </button>
                        <div>
                            <Link to="/reset">Forgot Password</Link>
                        </div>
                    </div>
                    <h2 className='error'>New User ? <Link to="/register">Register Here</Link></h2>
                    <h2 className='error'>{error}</h2>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;