import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {FavouritesProvider} from "./hooks/useFavourites";
import {ImagePropsProvider} from "./Context/useImageProps";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <FavouritesProvider>
        <ImagePropsProvider>
            <App/>
        </ImagePropsProvider>
    </FavouritesProvider>
);
