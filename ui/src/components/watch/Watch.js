import React from "react";
import './Watch.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation } from "react-router-dom";

function Watch(){
    const location = useLocation();
    const movie = location.state;
    return(
        <div className="watch">
            <div className="back">
                <Link to="/" className="link">
                    <ArrowBackIcon />
                    Home
                </Link>
            </div>
            <video className="video" autoPlay controls src={movie.video} />
        </div>
    )
}

export default Watch;