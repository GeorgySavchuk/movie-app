import React from 'react';
import classes from "./MoviePlayerLayout.module.css"
const MoviePlayerLayout = ({children, hideMoviePlayer}) => {
    return (
        <div className={classes.layout}>
            {children}
            <div className={classes.exit} onClick={() => {
                hideMoviePlayer(false)
                document.body.style.overflow = 'visible'
            }}>
                <svg data-name="Capa 1" viewBox="0 0 20 19.84" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m10.17 10 3.89-3.89a.37.37 0 1 0-.53-.53L9.64 9.43 5.75 5.54a.37.37 0 1 0-.53.53L9.11 10l-3.89 3.85a.37.37 0 0 0 0 .53.34.34 0 0 0 .26.11.36.36 0 0 0 .27-.11l3.89-3.89 3.89 3.89a.34.34 0 0 0 .26.11.35.35 0 0 0 .27-.11.37.37 0 0 0 0-.53Z"
                        fill="#ffffff" className="fill-000000"></path>
                </svg>
            </div>
        </div>
    );
};

export default MoviePlayerLayout;