import {tasksReducer} from "features/TodolistsList/tasks.reducer";
import {todolistsReducer} from "features/TodolistsList/todolists.reducer";
import {ActionCreatorsMapObject, AnyAction, bindActionCreators} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {appReducer} from "app/app.reducer";
import {authReducer} from "features/auth/auth.reducer";
import {configureStore} from "@reduxjs/toolkit";
import {useMemo} from "react";
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todolists: todolistsReducer,
        app: appReducer,
        auth: authReducer
    },
});

export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

// @ts-ignore
window.store = store;

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useDispatch()
    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])

    return boundActions
}