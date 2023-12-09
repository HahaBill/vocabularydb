import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import Home from "./routes/home";

export const routes = [
    {   
        path: '/',
        element: <Root/>,
        children: [
            {
                path: 'home',
                element: <Home />,
            },
        ]
    }
]

export const router = createBrowserRouter(routes);

