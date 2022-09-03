import React, {useEffect, useState} from "react";
import './Login.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import login from "../authContext/apiCalls";
import { useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";
import { Link } from "react-router-dom";

function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [authMsg,setAuthMsg] = useState('');
    const [authClass,setAuthClass] = useState('');
    const {dispatch} = useContext(AuthContext);
    const handleLogin = (e) => {
        e.preventDefault();
        setPassword('');
        login({email,password}, dispatch, setAuthMsg, setAuthClass);
    }
    useEffect(() => {
        setAuthMsg('');
        setAuthClass('');
    },[email])
    return(
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <span>FLIXXIT</span>
                </div>
            </div>
            <div className="container">
                <form onSubmit={handleLogin}>
                    <h1>Sign In</h1>
                    <div className={authClass}>{authMsg}</div>
                    <input type="email" placeholder="Email address" required value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" required minLength={4} maxLength={60} value={password} onChange={e => setPassword(e.target.value)} />
                    <button type="submit" className="loginButton">Sign In</button>
                    <div className="checkHelp">
                        <div className="rememberCheck">
                            <input type="checkbox" />&nbsp;<span>Remember me</span>
                        </div>
                        <p>Need help?</p>
                    </div>
                    <div className="facebook">
                        <div className="whiteBG"></div>
                        <FacebookIcon className="facebookIcon" color="primary" fontSize="large"/>
                        <span> Login with Facebook</span>
                    </div>
                    <p><span>New to Netflix?</span><Link to="/register" className="link"> <b style={{cursor: "pointer"}}>Sign Up now</b></Link></p>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot. <b>Learn more</b>.
                    </small>
                </form>
            </div>
        </div>
    )
}

export default Login;