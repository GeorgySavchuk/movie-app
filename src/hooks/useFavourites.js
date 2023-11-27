import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export function useFavourites() {
    return useContext(FavoritesContext);
}

export function FavouritesProvider({ children }) {
    const [favouriteMovies, setFavouriteMovies] = useState(JSON.parse(localStorage.getItem('favourites'))?.favourites)
    const toggleFavourite = (props) => {
        if(favouriteMovies) {
            if (favouriteMovies.some((favouriteMovie) => favouriteMovie.name === props.name)) {
                const obj = JSON.parse(localStorage.getItem('favourites'))
                obj.favourites = favouriteMovies.filter((favouriteMovie) => favouriteMovie.name !== props.name)
                setFavouriteMovies(favouriteMovies.filter((favouriteMovie) => favouriteMovie.name !== props.name));
                localStorage.setItem('favourites', JSON.stringify(obj))

            } else {
                const obj = JSON.parse(localStorage.getItem('favourites'));
                obj.favourites.push(props);
                localStorage.setItem('favourites', JSON.stringify(obj));
                setFavouriteMovies([...favouriteMovies, props]);
            }
        } else {
            const favourites = [];
            favourites.push(props);
            const obj = {
                favourites: favourites
            }
            localStorage.setItem('favourites', JSON.stringify(obj));
            setFavouriteMovies([props])
        }
    };
    const isFavourite = props => {
        if(favouriteMovies) {
            return favouriteMovies.some((favouriteMovie) => favouriteMovie.name === props.name)
        }
        return false
    }

    return (
        <FavoritesContext.Provider value={{favouriteMovies, isFavourite, toggleFavourite }}>
            {children}
        </FavoritesContext.Provider>
    );
}