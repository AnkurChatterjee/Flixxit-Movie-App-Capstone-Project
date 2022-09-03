import React, { useRef, useState } from "react";
import './List.css';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ListItem from "./ListItem";

function List({list}){
    const [slideNumber,setSlideNumber] = useState(0);
    const listRef = useRef();
    const handleClick = (direction) => {
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if(direction === 'left' && slideNumber>0){
            setSlideNumber(slideNumber-1);
            listRef.current.style.transform = `translateX(${230*6+distance}px)`;
        }
        if(direction === 'right' && slideNumber<4){
            setSlideNumber(slideNumber+1);
            listRef.current.style.transform = `translateX(${-230*6+distance}px)`;
        }
    }
    return(
        <div className="list">
            <span className="listTitle">{list.title}</span>
            <div className="wrapper">
                <ArrowBackIosNewOutlinedIcon className="sliderArrow left" onClick={() => handleClick("left")} style={{display: slideNumber === 0 && "none"}} />
                <div className="container" ref={listRef}>
                    {list.content.map((item,index) => <ListItem key={index} index={index} item={item} />)}
                </div>
                <ArrowForwardIosOutlinedIcon className="sliderArrow right" onClick={() => handleClick("right")} style={{display: slideNumber === 3 && "none"}} />
            </div>
        </div>
    )
}

export default List;