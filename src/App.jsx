import './App.css';
import React, { useEffect } from "react";
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from './components/RegisterForm';
import { useNavigate } from "react-router-dom";
import Chat from './components/Chat';
import ResetForm from "./components/ResetForm";
import Map from "./components/Map";
import MapPage from './components/MapPage';


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
                <Route path='/reset' element={<ResetForm />} />
                <Route path='/register' element={<RegisterForm />} />
                <Route path='/chat' element={ <Chat />} />
                <Route path='/map' element={ <MapPage />} />
            </Routes>
        </Router>
    );
}

export default App;