import React from "react";
import './Footer.css';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer(){
    return(
        <div className="footer">
            <div className="icons">
                <FacebookOutlinedIcon className="icon" sx={{color: "white"}} />
                <InstagramIcon className="icon" sx={{color: "white"}} />
                <TwitterIcon className="icon" sx={{color: "white"}} />
                <YouTubeIcon className="icon" sx={{color: "white"}} />
            </div>
            <div className="list">
                <div>Audio and Subtitles</div>
                <div>Audio Description</div>
                <div>Help Center</div>
                <div>Gift Cards</div>
                <div>Media Center</div>
                <div>Investor Relations</div>
                <div>Jobs</div>
                <div>Terms of Use</div>
                <div>Privacy</div>
                <div>Legal Notices</div>
                <div>Cookie Preferences</div>
                <div>Corporate Information</div>
                <div>Contact Us</div>
            </div>
            <div className="box">
                <span className="service">
                    Service Code
                </span>
            </div>
            <div className="copyright">
                &copy; 2022 Flixxit, Inc
            </div>
        </div>
    )
}

export default Footer;