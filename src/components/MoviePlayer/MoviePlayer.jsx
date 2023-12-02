import React, {useEffect, useRef} from 'react';
import Kinobox from "gh-pages/lib/git";

const MoviePlayer = ({movieID}) => {
    return (
        <div className="player-container">
            <div className="kinobox_player"></div>
            <script src="https://kinobox.tv/kinobox.min.js"></script>
            <script>{new Kinobox('.kinobox_player', {
                search: {kinopoisk: movieID},
                menu: {
                    default: 'menuList',
                    mobile: 'menuButton',
                    format: '{N} :: {T} ({Q})',
                    limit: 5,
                    open: false,
                }
            }).init()}</script>
        </div>
    );
};

export default MoviePlayer;