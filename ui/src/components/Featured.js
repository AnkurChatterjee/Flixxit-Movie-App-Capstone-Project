import React, {useState,useEffect} from 'react';
import './Featured.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Featured({type,setGenre}){
    const [content,setContent] = useState({});
    useEffect(() => {
        const getRandomContent = async () => {
            try{
                let url = type ? `http://localhost:9091/api/movies/random?type=${type}` : 
                `http://localhost:9091/api/movies/random`;
                const response = await axios.get(url,{
                    headers: {
                        token: "Bearer "+JSON.parse(localStorage.getItem('user')).accessToken 
                    }
                });
                setContent(response.data[0]);
            } catch(err) {
                console.log(err);
            }
        }
        getRandomContent();
    },[type])
    console.log(content);
    return(
        <div className='featured'>
            {type && 
                <div className='category'>
                    <span>{type === 'movie' ? "Movies" : "Series"}</span>
                    <select name='genre' id='genre' onChange={e => setGenre(e.target.value)}>
                        <option>Genre</option>
                        <option value="Action">Action</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Horror">Horror</option>
                        <option value="Romance">Romance</option>
                        <option value="History">History</option>
                        <option value="Thriller">Thriller</option>
                    </select>
                </div>
            }
            <img src={content.img} alt='' />
            <div className='info'>
                <span className='desc'>
                    {content.desc}
                </span>
                <div className='buttons'>
                <Link to='/watch' state={content} className='link'>
                    <button className='play'>
                        <PlayArrowIcon sx={{fontSize: 45}} />
                        <span style={{marginLeft: "5px"}}>Play</span>
                    </button>
                    </Link>
                    <button className='more'>
                        <InfoOutlinedIcon sx={{fontSize: 30}} />
                        <span>More Info</span>
                    </button>
                    
                </div>
            </div>
        </div>
    )
}

export default Featured;