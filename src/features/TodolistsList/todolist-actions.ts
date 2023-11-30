import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from "../../common/utils";
import {todolistsApi, TodolistType, UpdateTodolistTitleArgType} from "./todolists.api";
import {appActions} from "../../app/app.reducer";
import {ResultCode} from "../../common/enums";
import {todolistsActions} from "./todolists.reducer";

export const addTodolistTC = createAppAsyncThunk<{ todolist: TodolistType }, string>(
    "todo/addTodolist",
    async (title, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({status: "loading"}));
            const res = await todolistsApi.createTodolist(title);
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(appActions.setAppStatus({status: "succeeded"}));
                return {todolist: res.data.data.item};
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
        }
    },
);
export const removeTodolistTC = createAppAsyncThunk<{
    id: string
}, string>("todo/removeTodolist", async (id, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        dispatch(appActions.setAppStatus({status: "loading"}));
        dispatch(todolistsActions.changeTodolistEntityStatus({id, entityStatus: "loading"}));
        const res = await todolistsApi.deleteTodolist(id);
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(appActions.setAppStatus({status: "succeeded"}));
            return {id};
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    }
});
export const changeTodolistTitleTC = createAppAsyncThunk<UpdateTodolistTitleArgType, UpdateTodolistTitleArgType>(
    "todo/changeTodolistTitle",
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({status: "loading"}));
            const res = await todolistsApi.updateTodolist(arg);
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(appActions.setAppStatus({status: "succeeded"}));
                return arg;
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
        }
    },
);
export const fetchTodolistsTC = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(
    "todo/fetchTodolists",
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({status: "loading"}));
            const res = await todolistsApi.getTodolists();
            dispatch(appActions.setAppStatus({status: "succeeded"}));
            return {todolists: res.data};
        } catch (e) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
        }
    },
);