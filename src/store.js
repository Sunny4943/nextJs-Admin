import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../pages/reducers/auth'
import rootReducer from '../pages/reducers'
import { saveState } from './stateLoader'

const store = configureStore({ reducer: rootReducer })
store.subscribe(() => {
    saveState(store.getState());
});
console.log("store : " + JSON.stringify(store.getState()))
export { store };
