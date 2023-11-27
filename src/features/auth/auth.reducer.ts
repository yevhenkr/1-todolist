import {createSlice} from "@reduxjs/toolkit";
import {appActions} from "app/app.reducer";
import {authAPI, LoginParamsType} from "features/auth/auth.api";
import {clearTasksAndTodolists} from "common/actions";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from "common/utils";
import {ResultCode} from "../../common/enums";
import {thunkTryCatch} from "../../common/utils/thunkTryCatch";

const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
    }
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
    `${slice.name}/initializeApp`,
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        const res = await authAPI.me()
        return thunkTryCatch(thunkAPI, async () => {
            if (res.data.resultCode === 0) {
                return {isLoggedIn: true};
            } else {
                handleServerAppError(res.data, dispatch, false);
                return rejectWithValue(null);
            }
        }).finally(() => {
            dispatch(appActions.setAppInitialized({isInitialized: true}))
        })
    })
// thunks
const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
    'auth/login', async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setAppStatus({status: 'loading'}))
            const res = await authAPI.login(arg)
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
                return {isLoggedIn: true}
            } else {
                // ❗ Если у нас fieldsErrors есть значит мы будем отображать эти ошибки
                // в конкретном поле в компоненте (пункт 7)
                // ❗ Если у нас fieldsErrors нету значит отобразим ошибку глобально
                const isShowAppError = !res.data.fieldsErrors.length
                handleServerAppError(res.data, dispatch, isShowAppError);
                return rejectWithValue(res.data)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    }
)


const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
    `${slice.name}/logout`,
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        dispatch(appActions.setAppStatus({status: "loading"}));
        try {
            const res = await authAPI.logout()
            if (res.data.resultCode === 0) {
                dispatch(clearTasksAndTodolists());
                dispatch(appActions.setAppStatus({status: "succeeded"}));
                return {isLoggedIn: false};
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
        }
    })


export const authReducer = slice.reducer;
export const authThunk = {login, logout, initializeApp};
