import React from 'react';
import {routes} from "../../router";
import {Route, Routes} from "react-router-dom";

const AppRouter = () => {
    return (
        <Routes>
            {routes.map(route =>
                <Route key={route.path} path={route.path} element={route.element}/>
            )}
        </Routes>
    );
};

export default AppRouter;