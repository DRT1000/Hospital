import {applyMiddleware, combineReducers, createStore} from "redux";
import {hospitalReducer} from "./hospital-reducer";
import thunkMiddleware from 'redux-thunk'


const rootReducer = combineReducers({
    hospital: hospitalReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>