import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function RegisterForm() {
    const [username, setUsername] = useState('');
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
        if (!(username.length > 0 && password === confirmPassword && password.length > 0)) return;

  const authObject = {
     'Private-Key': '1f87004e-5579-401d-9fb4-224be5928648',
     'Project-ID': '327ef6ee-a3b0-4e52-829e-9cd277e8e4a5',
     'User-Name': username,
     'User-Secret': password
  }

  const authHeader = {
    'Private-Key': '1f87004e-5579-401d-9fb4-224be5928648'
    // 'Project-ID': '327ef6ee-a3b0-4e52-829e-9cd277e8e4a5',
  }
  // const authBody = {
  //    'username': username,
  //    'secret': password
  // }



  try {
    //fetch the current user if it exists
    const userExists = await axios.get('https://api.chatengine.io/users/', {
      headers: authObject
    });
    console.log('worked');
    console.log(userExists);
    // if user already exists
    if (userExists && (localStorage.getItem('username') && localStorage.getItem('username') === username)) {
      setError(`User already Exists`)
    }
    console.log('worked2');
    // if user doesnt exist, create a new user 
      await axios.post('https://api.chatengine.io/users/',
          { 'username': username, 'secret': password }, // Body object
          { 'headers': authHeader }); // Headers object);
    // //saving user's username and password to localStorage
     localStorage.setItem('username', username);
     localStorage.setItem('password', password);
    //redirecting them to the login page to login
     
  } catch (error) {
    console.log(error);
    setError(`oops, something went wrong`)
  }

    }
    return (
        <div className='wrapper'>
            <div className='form'>
                <h1 className='title'>Chat Application</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder='Username' required />
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