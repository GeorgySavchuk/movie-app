import Films from "../components/Films/Films";
import Home from "../components/Home/Home";
import Serials from "../components/Serials/Serials";
import Favourites from "../components/Favourites/Favourites";
import MoviePage from "../components/MoviePage/MoviePage";

export const routes = [
    {path: "/", element: <Home/>},
    {path: "/films", element: <Films/>},
    {path: "/serials", element: <Serials/>},
    {path: "/favourites", element: <Favourites/>},
    {path: "/movies/:name", element: <MoviePage/>},
]