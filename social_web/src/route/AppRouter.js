// src/AppRouter.js

import { useSelector } from 'react-redux';
import { BrowserRouter, createBrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import * as ScreenName from '../screens';


const APP_ROUTES = [
    {
        path: "/",
        element: <Navigate to="/login" replace />, // Redirect from "/" to "/login"
    },
    {
        path: "/login",
        element: <ScreenName.Login />,
    },
    {
        path: "/register",
        element: <ScreenName.Register />,
    },
    {
        path: "/profile",
        element: <ScreenName.Profile />,
    },
    {
        path: "/editProfile",
        element: <ScreenName.EditProfile />,
    },
    {
        path: "/home",
        element: <ScreenName.Home />,
    }
];


export const route = createBrowserRouter(APP_ROUTES)

const AppRouter = () => {
    const userData = useSelector((state) => state?.authReducers?.userData || {})
    console.log(userData, "userDatauserDatauserData");

    return (
        <BrowserRouter>
            <Routes>
                {APP_ROUTES.map((route, index) => {
                    return (
                        <Route key={index} path={route.path} element={route.element} />
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
