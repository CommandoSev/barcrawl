import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
        const authObject = { 'Project-ID': "327ef6ee-a3b0-4e52-829e-9cd277e8e4a5", "User-Name": username, 'User-Secret': password };
        
        try {
            await axios.get('https://api.chatengine.io/chats', { headers: authObject });
            localStorage.setItem('username', username);
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
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder='Password' required />
                    <div align="center">
                        <button type="submit" className='button'>
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    <h2 className='error'>New User ? <Link to="/register">Register Here</Link></h2>
                    <h2 className='error'>{error}</h2>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;