import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {FavouritesProvider} from "./hooks/useFavourites";
import {ImagePropsProvider} from "./Context/useImageProps";
import './firebase/FirebaseInit'
import {store} from "./store/store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <FavouritesProvider>
            <ImagePropsProvider>
                <App/>
            </ImagePropsProvider>
        </FavouritesProvider>
    </Provider>
);