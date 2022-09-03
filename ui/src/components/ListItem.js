import React, {useEffect, useState} from "react";
import './ListItem.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import axios from "axios";
import { Link } from "react-router-dom";

function ListItem({index,item}){
    const [isHovered,setIsHovered] = useState(false);
    const [mute,setMute] = useState(true);
    const [movie,setMovie] = useState({});
    useEffect(() => {
        const getMovie = async () => {
            try{
                let url = `http://localhost:9091/api/movies/find/${item}`;
                const response = await axios.get(url, {
                    headers: {
                        token: "Bearer "+JSON.parse(localStorage.getItem('user')).accessToken
                    },
                });
                setMovie(response.data);
            } catch(err) {
                console.log(err);
            }
        }
        getMovie();
    },[item])
    return(
        <div className="listItem" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{left: index*225+index*5}} >
            <img src={movie.img} alt="" />

            {isHovered && (
                <div>
                    <video src={movie.trailer} autoPlay loop muted={mute ? true : false} ></video>
                    <div className="volume" onClick={()=>setMute(!mute)} >
                        {!mute ? <VolumeUpOutlinedIcon /> : <VolumeOffOutlinedIcon />}
                    </div>
                    <div className="itemInfo">
                        <div className="icons">
                            <Link to='/watch' state={movie}>
                                <PlayArrowIcon className="play icon" sx={{color: "black", fontSize: 30}} />
                            </Link>
                            <AddIcon className="icon" />
                            <ThumbUpOutlinedIcon className="icon" />
                            <ThumbDownOffAltOutlinedIcon className="icon" />
                        </div>
                        <div className="movieTitle">{movie.title}</div>
                        <div className="itemInfoTop">
                            <span>{movie.duration}</span>
                            <span className="limit">{movie.limit}+</span>
                            <span>{movie.year}</span>
                        </div>
                        <div className="desc">
                            {movie.desc}
                        </div>
                        <div className="genre">{movie.genre}</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ListItem;

/**/