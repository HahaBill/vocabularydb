import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "./routes/root";
import Home from "./routes/home";
import AuthPage from "./routes/auth-route/auth-page";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";

export const routes = [
    {   
        path: '/',
        element: <Root/>,
        children: [
            { index: true, element: <Navigate to="/home" /> },
            {
                path: 'home',
                element:
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>,
            },
        ]
    },
    {
        path: '/auth',
        element: <AuthPage/>,
    }
]

export const router = createBrowserRouter(routes);

