import React, {useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Register.css';

function Register(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [username,setUsername] = useState("");
    const navigate = useNavigate();
    const emailRef = useRef();
    const handleStart = (e) => {
        e.preventDefault();
        setEmail(emailRef.current.value)
    }
    const handleFinish = async (e) => {
        e.preventDefault();
        try{
            let url = `http://localhost:9091/api/auth/register`;
            await axios.post(url, {email,username,password})
        } catch(err) {
            console.log(err);
        }
        navigate("/login");
    }
    return(
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <span>FLIXXIT</span>
                    <button type="button" className="loginButton" onClick={() => navigate("/login")}>Sign In</button>
                </div>
            </div>
            <div className="container">
                <h1>Unlimited movies, TV shows, and more</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>
                    Ready to watch? Enter your email to create or restart your membership.
                </p>
                {!email ? (
                    <form className="input" onSubmit={handleStart}>
                        <input type="email" placeholder="Enter your email address" ref={emailRef} />
                        <button type="submit" className="registerButton">Get Started</button>
                    </form>
                ) : (
                    <form className="inputForm" onSubmit={handleFinish}>
                        <input type="text" placeholder="Enter your username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Enter your password" required minLength={4} maxLength={60} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" className="registerButton">Start</button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Register;