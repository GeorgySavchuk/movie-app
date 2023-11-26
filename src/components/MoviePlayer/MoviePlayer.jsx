import React from 'react';
import Kinobox from "gh-pages/lib/git";

const MoviePlayer = () => {
    return (
        <>
            <div className="kinobox_player"></div>
            <script src="https://kinobox.tv/kinobox.min.js"></script>
            <script>{new Kinobox('.kinobox_player', {search: {kinopoisk: `${'ID фиильма'}`}}).init()}</script>
        </>
    );
};

export default MoviePlayer;