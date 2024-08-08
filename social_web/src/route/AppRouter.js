// src/AppRouter.js
import React from 'react';

import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthRoute from './AuthRoute';
import MainRoute from './MainRoute';

const AppRouter = () => {
    const userData = useSelector((state) => state?.authReducers?.userData || {})
    console.log(userData, "userDatauserDatauserData");

    const router = userData?.accessToken ? MainRoute() : AuthRoute();

    return (
        <RouterProvider router={router} />
    );
};

export default AppRouter;
