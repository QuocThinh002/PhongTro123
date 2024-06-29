import authReducer from './authReducer';
import userReducer from './userReducer';
import postReducer from './postReducer';
import priceRangeReducer from './priceRangeReducer'
import acreageRangeReducer from './acreageRangeReducer';

import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { persistReducer } from 'redux-persist';

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['isLoggedIn', 'token']
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    user: userReducer,
    post: postReducer,
    priceRange: priceRangeReducer,
    acreageRange: acreageRangeReducer,
})

export default rootReducer;