import React, {useEffect, useState} from 'react';
import classes from "./DropDownItem.module.css"
import CustomLink from "../UI/CustomLink/CustomLink";
const DropDownItem = ({img, text, onClick, isOpen, isActive}) => {
    let path;
    switch(text) {
        case "Главная":
            path = "/";
            break;
        case "Фильмы":
            path = "/films";
            break;
        case "Сериалы":
            path = "/serials";
            break;
    }
    return (
        <li className={`${classes.dropDownItem} ${isOpen ? classes.active : ''}`}>
            {isActive && <span></span>}
            <img style={{width:'20px', height:'20px'}} src={img}/>
            <CustomLink to={path} onClick={() => onClick()} style={{textDecoration:'none', color: '#49c5b6'}}>
                {text}
            </CustomLink>
        </li>
    );
};

export default DropDownItem;