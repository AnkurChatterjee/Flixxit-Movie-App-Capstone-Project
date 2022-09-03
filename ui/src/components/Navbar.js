import React, { useState } from "react";
import './Navbar.css';
import dp from './images/dp.jpg';
import rohit from './images/rohit.jpg';
import virat from './images/virat.jpg';
import sania from './images/sania.jpg';
import child from './images/child.jpg';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import {Link} from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";
import { logout } from "../authContext/AuthActions";

function Navbar(){
    const [isScrolled,setIsScrolled] = useState(false);
    const {dispatch} = useContext(AuthContext);
    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true)
        return () => (window.onscroll = null)
    }
    return(
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <span className="logo">FLIXXIT</span>
                    <Link to='/' className="link"><span>Home</span></Link>
                    <Link to='/series' className="link"><span>Series</span></Link>
                    <Link to='/movies' className="link"><span>Movies</span></Link>
                    <span>New & Popular</span>
                    <span>My List</span>
                </div>
                <div className="right">
                    <SearchIcon className="icon " />
                    <span>Children</span>
                    <NotificationsIcon className="icon " />
                    <div className="profile">
                        <div className="pic">
                            <img src={dp} width="40px" height="40px" alt="profile-pic" />
                            <ArrowDropDownIcon className="icon" />
                        </div>
                        <div className="dropdown">
                            <ArrowDropUpOutlinedIcon />
                            <div className="options">
                                <span><img src={rohit} width="30px" height="30px" alt="Rohit" /><div>Rohit</div></span>
                                <span><img src={virat} width="30px" height="30px" alt="Virat" /><div>Virat</div></span>
                                <span><img src={sania} width="30px" height="30px" alt="Sania" /><div>Sania</div></span>
                                <span><img src={child} width="30px" height="30px" alt="Children" /><div>Children</div></span>
                                <span className="seperate"><EditOutlinedIcon className="svg" /><div>Manage Profiles</div></span>
                                <span><PermIdentityOutlinedIcon className="svg" /><div>Account</div></span>
                                <span className="seperate"><HelpOutlineOutlinedIcon className="svg" /><div>Help Center</div></span>
                                <span className="last" onClick={() => dispatch(logout())}><div>Sign out of Flixxit</div></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;