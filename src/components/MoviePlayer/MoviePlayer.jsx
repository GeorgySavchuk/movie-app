import React, {useEffect} from "react";
import classes from "./MoviePlayer.module.css"
const MoviePlayer = ({movieID}) => {
    const rootClasses = ["kinobox_player", classes.moviePlayer]
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://kinobox.tv/kinobox.min.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            new window.Kinobox('.kinobox_player', {
                search: {
                    kinopoisk: movieID
                },
                menu: {
                    default: 'menuList',
                    mobile: 'menuButton',
                    format: '{N} :: {T} ({Q})',
                    open: false,
                },
                players: {},
            }).init();
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className={rootClasses.join(' ')}></div>
    );
};

export default MoviePlayer;