import Films from "../components/Films/Films";
import Home from "../components/Home/Home";
import Serials from "../components/Serials/Serials";
import Favourites from "../components/Favourites/Favourites";
import MoviePage from "../components/MoviePage/MoviePage";
import Login from "../components/Login/Login";
import ActorPage from "../components/ActorPage/ActorPage";

export const routes = [
    {path: "/movie-app", element: <Home/>},
    {path: "/movie-app/films", element: <Films/>},
    {path: "/movie-app/serials", element: <Serials/>},
    {path: "/movie-app/favourites", element: <Favourites/>},
    {path: "/movie-app/movies/:name", element: <MoviePage/>},
    {path: "/movie-app/login", element: <Login/>},
    {path: "/movie-app/:actorName", element: <ActorPage/>}
]