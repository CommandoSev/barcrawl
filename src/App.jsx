import './App.css';
import React, { useEffect } from "react";
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from './components/RegisterForm';
import { useNavigate } from "react-router-dom";
import Chat from './components/Chat';
import NavBar from './components/NavBar';
import Privacy from './components/Privacy';
import Terms from './components/Terms';


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
            <NavBar />
            <Routes>
                <Route path='/' element={<LoginForm />} />
                <Route path='/register' element={<RegisterForm />} />
                <Route path='/chat' element={<Chat />} />
                <Route path='/privacy' element={<Privacy />} />
                <Route path='/terms' element={ <Terms />} />
            </Routes>
        </Router>
    );
}

export default App;