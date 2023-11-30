import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions, RequestStatusType} from "app/app.reducer";
import {todolistsApi, TodolistType} from "features/TodolistsList/todolists.api";
import {createAppAsyncThunk, handleServerAppError} from "common/utils";
import {ResultCode} from "common/enums";
import {clearTasksAndTodolists} from "common/actions";
import {thunkTryCatch} from "../../common/utils/thunkTryCatch";
import {addTodolistTC, changeTodolistTitleTC, fetchTodolistsTC, removeTodolistTC} from "./todolist-actions";

const initialState: TodolistDomainType[] = [];

const slice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        changeTodolistFilterAC: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
            const todo = state.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.filter = action.payload.filter;
            }
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
            const todo = state.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.entityStatus = action.payload.entityStatus;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                return action.payload.todolists.map((tl) => ({...tl, filter: "all", entityStatus: "idle"}));
            })
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                const newTodolist: TodolistDomainType = {
                    ...action.payload.todolist,
                    filter: "all",
                    entityStatus: "idle",
                };
                state.unshift(newTodolist);
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex((todo) => todo.id === action.payload.id);
                if (index !== -1) state.splice(index, 1);
            })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const todo = state.find((todo) => todo.id === action.payload.id);
                if (todo) {
                    todo.title = action.payload.title;
                }
            })
            .addCase(clearTasksAndTodolists, () => {
                return [];
            });
    },
});

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = {fetchTodolists: fetchTodolistsTC, addTodolist: addTodolistTC, removeTodolist: removeTodolistTC, changeTodolistTitle: changeTodolistTitleTC};

// types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType;
    entityStatus: RequestStatusType;
};