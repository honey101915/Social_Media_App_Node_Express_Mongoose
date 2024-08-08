// src/AppRouter.js
import React from 'react';

import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileScreen from '../screens/Profile/Profile';

const MainRoute = () => {
    const userData = useSelector((state) => state?.authReducers?.userData || {})
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/profile" replace />, // Redirect from "/" to "/profile"
        },
        {
            path: "/profile",
            element: <ProfileScreen />,
        }
    ]);
    return router;
};

export default MainRoute;
