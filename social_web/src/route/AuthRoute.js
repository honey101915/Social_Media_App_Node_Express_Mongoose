// src/AppRouter.js
import React from 'react';

import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthRoute = () => {
    const userData = useSelector((state) => state?.authReducers?.userData || {})
    const route = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/login" replace />, // Redirect from "/" to "/login"
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        }
    ]);
    return route;
};

export default AuthRoute;
