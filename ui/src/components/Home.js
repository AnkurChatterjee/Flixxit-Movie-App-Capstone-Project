import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from './Navbar';
import Featured from './Featured';
import List from './List';
import Footer from './Footer';
import axios from 'axios';

function Home({type}){
    const [lists,setLists] = useState([]);
    const [genre,setGenre] = useState('');
    useEffect(() => {
        const getRandomLists = async () => {
            try{
                let url=`http://localhost:9091/api/lists/random/${type? "?type=" + type : ""}${genre? "&genre=" + genre : ""}`;
                const response = await axios.get(url,{
                    headers: {
                        token: "Bearer "+JSON.parse(localStorage.getItem('user')).accessToken
                    }
                });
                setLists(response.data);
                console.log(response)
            } catch(err) {
                console.log(err);
            }
        }
        getRandomLists();
    },[genre,type])
    return(
        <div className='home'>
            <Navbar />
            <Featured type={type} setGenre={setGenre}/>
            {lists.map((list) => <List key={list._id} list={list}/>)}
            <Footer />
        </div>
    )
}

export default Home;