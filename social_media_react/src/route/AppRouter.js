// src/AppRouter.js
import React from 'react';

import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const AppRouter = () => {
    const route = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        }
    ]);
    return (
        <RouterProvider router={route}></RouterProvider>
    );
};

export default AppRouter;
