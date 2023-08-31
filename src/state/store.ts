import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

const rootReducer = combineReducers({
    todolist: todolistsReducer,
    tasks: tasksReducer
})

// type AppRootState ={
//     todolist: Array<TodolistType>
//     tasks: TasksStateType
// }
export type AppRootState = ReturnType<typeof rootReducer>

export const store =createStore(rootReducer)

// @ts-ignore
window.store =store