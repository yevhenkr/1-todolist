import {TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title}
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export const ChangeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE' as const, id: id, title: title}
}

export type ChangeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: string
}
export const ChangeTodolistFilterAC = (id: string, filter: string) => {
    return {type: 'CHANGE-TODOLIST-FILTER' as const, id: id, filter: filter}
}

type ActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterType

export const todolistsReducer =
    (state: Array<TodolistType>, action: ActionType) => {
        switch (action.type) {
            case 'REMOVE-TODOLIST':
                return state.filter(todoList => todoList !== state[0]);
            case 'ADD-TODOLIST':
                return [...state, {id: v1(), title: action.title, filter: 'all'}];
            case 'CHANGE-TODOLIST-TITLE':
                return state.map(todoList => {
                        return todoList.id === action.id
                            ? {...todoList, title: action.title}
                            : todoList;
                    }
                )
            case 'CHANGE-TODOLIST-FILTER':
                return state.map(todoList =>
                    todoList.id === action.id
                        ? {...todoList, filter: action.filter}
                        : todoList
                )
            default:
                throw new Error('I don\'t understand this type')
        }
    }