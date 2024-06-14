import { path } from './path';

import Home from '../pages/Public/Home';
import Login from '../pages/Public/Login'

export const routes = [
    {
        path: path.HOME,
        element: <Home />,
        children: [
            {
                path: path.LOGIN,
                element: <Login />
            }
        ]
    },
]