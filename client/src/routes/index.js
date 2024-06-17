import { path } from './path';

import Home from '../pages/Public/Home';
import Login from '../pages/Public/Login';
import RentalHouse from '../pages/Public/RentalHouse';
import RentalRoom from '../pages/Public/RentalRoom';
import RentalSpace from '../pages/Public/RentalSpace';
import RentalApartment from '../pages/Public/RentalApartment';
import HomePage from '../pages/Public/HomePage';

export const routes = [
    {
        path: path.HOME,
        element: <Home />,
        children: [
            {
                path: '*',
                element: <HomePage />
            },
            {
                path: path.LOGIN,
                element: <Login />
            },
            {
                path: path.NHA_CHO_THUE,
                element: <RentalHouse />
            },
            {
                path: path.CHO_THUE_PHONG_TRO,
                element: <RentalRoom />
            },
            {
                path: path.CHO_THUE_MAT_BANG,
                element: <RentalSpace />
            },
            {
                path: path.CHO_THUE_CAN_HO,
                element: <RentalApartment />
            }
        ]
    },
]