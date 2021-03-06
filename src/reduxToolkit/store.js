

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import authenticatioauthennSlice from './authentication/authenticationSlice';
import EmployeeEventsSlice from './EmployeeEvents/EmployeeEventsSlice';
import EmployeeProviderSlice from './EmployeeProviders/EmployeeProviderSlice';
import EmployeeContractorsSlice from './EmployeeContractors/EmployeeContractorsSlice';
import EmployeeZonesSlice from './EmployeeZones/EmployeeZoneSlice';
import vehicleDocumentSlice from './CompanyDocuments/vehicleDocumentSlice';
import NotificationsSlice from './Notifications/NotificationsSlice';



const reducers = combineReducers({
    authenticatioauthennSlice,
    vehicleDocumentSlice,
    EmployeeContractorsSlice,
    EmployeeEventsSlice,
    EmployeeProviderSlice,
    EmployeeZonesSlice,
    NotificationsSlice,
});


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authenticatioauthennSlice']
};

const persistedReducer = persistReducer(persistConfig, reducers);



const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
})


export default store;
