import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export function useFavourites() {
    return useContext(FavoritesContext);
}

export function FavouritesProvider({ children }) {
    const [favourites, setFavourites] = useState([]);
    const toggleFavourite = (props) => {
        if (favourites.some((favouriteMovie) => favouriteMovie.name === props.name)) {
            setFavourites(favourites.filter((favouriteMovie) => favouriteMovie.name !== props.name));
        } else {
            setFavourites([...favourites, props]);
        }
    };
    const isFavourite = (props) => favourites.some(favouriteMovie => favouriteMovie.name === props.name)

    return (
        <FavoritesContext.Provider value={{favourites, isFavourite, toggleFavourite }}>
            {children}
        </FavoritesContext.Provider>
    );
}