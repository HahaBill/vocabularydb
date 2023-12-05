import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";

export const routes = [
    {   
        path: '/',
        element: <Root/>,
        children: [
            
        ]
    }
]

export const router = createBrowserRouter(routes);

