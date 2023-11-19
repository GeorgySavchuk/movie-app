import React, {useEffect, useState} from 'react';
import classes from './NavBar.module.css'
import Input from "../UI/Input/Input";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import {Fade as Hamburger} from 'hamburger-react'
import {Link} from "react-router-dom";
const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isSearchIconClicked, setIsSearchIconClicked] = useState(false)
    useEffect(() => {
        if(window.innerWidth <= 950) {
            if (isOpen || isSearchIconClicked) {
                document.body.style.overflowY = 'hidden'
            } else {
                document.body.style.overflowY = 'auto'
            }
        }
    }, [isOpen, isSearchIconClicked]);
    const handleSearchIconClick = () => {
        setIsSearchIconClicked(!isSearchIconClicked)
    }
    return (
        <>
            {isSearchIconClicked && <div className={classes.modal}>
                <div className={classes.inputTitle}>
                    <h1>Поиск</h1>
                </div>
                <div className={classes.modalSearchContainer}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Input placeholder="Поиск..." isModal={true} closeModal={handleSearchIconClick}/>
                    </form>
                </div>
                <div className={classes.exit} onClick={handleSearchIconClick}>
                    <svg data-name="Capa 1" viewBox="0 0 20 19.84" xmlns="http://www.w3.org/2000/svg"><path d="m10.17 10 3.89-3.89a.37.37 0 1 0-.53-.53L9.64 9.43 5.75 5.54a.37.37 0 1 0-.53.53L9.11 10l-3.89 3.85a.37.37 0 0 0 0 .53.34.34 0 0 0 .26.11.36.36 0 0 0 .27-.11l3.89-3.89 3.89 3.89a.34.34 0 0 0 .26.11.35.35 0 0 0 .27-.11.37.37 0 0 0 0-.53Z" fill="#49c5b6" className="fill-000000"></path></svg>
                </div>
            </div>}
            <div className={classes.navBar}>
                <div className={classes.visibleMenu}>
                    <Hamburger color="#49c5b6" direction="right" toggled={isOpen} size="32" rounded toggle={setIsOpen} onToggle={setIsOpen}/>
                    <Link to="/" style={{textDecoration: 'none'}}><h1 className={classes.title}>Мир Кино</h1></Link>
                </div>
                {isOpen && <NavigationMenu onClick={setIsOpen} isOpen={isOpen}/>}
                <div className={classes.gridContainer}>
                    <div className={classes.searchContainer}>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <Input placeholder="Поиск..." isModal={false} closeModal={handleSearchIconClick}/>
                        </form>
                    </div>
                    <div className={classes.accountIconAndSearchIcon}>
                        <div className={classes.searchIconContainer} onClick={handleSearchIconClick}>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.32 14.906 5.387 5.387-1.414 1.414-5.387-5.387a8 8 0 1 1 1.414-1.414ZM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" fillRule="evenodd" fill="#49c5b6" className="fill-000000"></path></svg>
                        </div>
                        <div className={classes.accountLogo}>
                            <svg><path d="M25 13c0-6.617-5.383-12-12-12S1 6.383 1 13c0 3.384 1.413 6.439 3.674 8.622a.732.732 0 0 0 .189.172C7.003 23.777 9.858 25 13 25s5.996-1.223 8.137-3.206a.732.732 0 0 0 .19-.172A11.957 11.957 0 0 0 25 13zM13 2.5c5.79 0 10.5 4.71 10.5 10.5 0 2.455-.853 4.71-2.27 6.5-.65-2.097-2.508-3.74-5.028-4.495a5.455 5.455 0 0 0 2.272-4.424c0-3.015-2.455-5.467-5.474-5.467s-5.474 2.452-5.474 5.467c0 1.82.899 3.43 2.272 4.424-2.52.756-4.377 2.398-5.028 4.496A10.44 10.44 0 0 1 2.5 13C2.5 7.21 7.21 2.5 13 2.5zm-3.974 8.08a3.974 3.974 0 0 1 7.948 0 3.974 3.974 0 0 1-7.948 0zM6.031 20.833c.225-2.75 3.141-4.785 6.969-4.785s6.744 2.035 6.97 4.785C18.112 22.486 15.675 23.5 13 23.5s-5.113-1.014-6.97-2.668z" fill="#49c5b6" className="fill-1d1d1b"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;