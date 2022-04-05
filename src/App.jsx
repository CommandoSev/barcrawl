import './App.css';
import React, { useEffect } from "react";
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from './components/RegisterForm';
import { useNavigate } from "react-router-dom";
import Chat from './components/Chat';


function App() {

    // const userInfo = localStorage.getItem('username');

    // const navigate = useNavigate();

    //  useEffect(() => { 
    //     if (!userInfo) { 
    //      navigate("/login")
    //    }
    //  }, [navigate, userInfo]);

    return (
        <Router>
            <Routes>
                <Route path='/login' element={<LoginForm />} />
                <Route path='/register' element={<RegisterForm />} />
                <Route path='/chat' element={ <Chat />} />
            </Routes>       
            </Router>
    );
}

export default App;