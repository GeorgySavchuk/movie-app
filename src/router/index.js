import Films from "../components/Films/Films";
import Home from "../components/Home/Home";
import Serials from "../components/Serials/Serials";
import Favourites from "../components/Favourites/Favourites";
import MoviePage from "../components/MoviePage/MoviePage";
import Login from "../components/Login/Login";
import ActorPage from "../components/ActorPage/ActorPage";

export const routes = [
    {path: "/", element: <Home/>},
    {path: "/films", element: <Films/>},
    {path: "/serials", element: <Serials/>},
    {path: "/favourites", element: <Favourites/>},
    {path: "/movies/:name", element: <MoviePage/>},
    {path: "/login", element: <Login/>},
    {path: "/:actorName", element: <ActorPage/>}
]