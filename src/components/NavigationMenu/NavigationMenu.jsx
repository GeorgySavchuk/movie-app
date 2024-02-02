import React, {useEffect, useState} from 'react';
import classes from './NavigationMenu.module.css'
import DropDownItem from "../DropDownItem/DropDownItem";
import newHome from '../UI/images/new-home.png'
import newMovies from '../UI/images/new-movies.png'
import newSerials from '../UI/images/new-serials.png'
import newFavourites from '../UI/images/new-favourites.png'
const NavigationMenu = ({onClick, isOpen}) => {
    return (
        <div className={classes.navigationMenu}>
            <ul className={classes.list}>
                <DropDownItem text="Главная" img={newHome} onClick={onClick} isOpen={isOpen}  isActive={window.location.pathname === "/"}/>
                <DropDownItem text="Фильмы" img={newMovies} onClick={onClick} isOpen={isOpen}  isActive={window.location.pathname === "/films"}/>
                <DropDownItem text="Сериалы" img={newSerials} onClick={onClick} isOpen={isOpen}  isActive={window.location.pathname === "/serials"}/>
            </ul>
        </div>
    );
};

export default NavigationMenu;