import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {FavouritesProvider} from "./hooks/useFavourites";
import {MoviePropsProvider} from "./Context/useMovieProps";
import './firebase/FirebaseInit'
import {store} from "./store/store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <FavouritesProvider>
            <MoviePropsProvider>
                <App/>
            </MoviePropsProvider>
        </FavouritesProvider>
    </Provider>
);