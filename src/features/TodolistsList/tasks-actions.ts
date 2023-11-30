import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from "../../common/utils";
import {
    AddTaskArgType,
    RemoveTaskArgType,
    TaskType,
    todolistsApi,
    UpdateTaskArgType,
    UpdateTaskModelType
} from "./todolists.api";
import {appActions} from "../../app/app.reducer";
import {thunkTryCatch} from "../../common/utils/thunkTryCatch";
import {ResultCode} from "../../common/enums";

export const fetchTasksTC = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
    "tasks/fetchTasks",
    async (todolistId, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({status: "loading"}));
            const res = await todolistsApi.getTasks(todolistId);
            const tasks = res.data.items;
            dispatch(appActions.setAppStatus({status: "succeeded"}));
            return {tasks, todolistId};
        } catch (e) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
        }
    },
);
export const addTaskTC = createAppAsyncThunk<{
    task: TaskType
}, AddTaskArgType>("tasks/addTask", async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistsApi.createTask(arg);
        if (res.data.resultCode === ResultCode.Success) {
            const task = res.data.data.item;
            return {task};
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    })
});
export const updateTaskTC = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
    "tasks/updateTask",
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue, getState} = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({status: "loading"}));
            const state = getState();
            const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId);
            if (!task) {
                dispatch(appActions.setAppError({error: "Task not found in the state"}));
                return rejectWithValue(null);
            }

            const apiModel: UpdateTaskModelType = {
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                title: task.title,
                status: task.status,
                ...arg.domainModel,
            };

            const res = await todolistsApi.updateTask(arg.todolistId, arg.taskId, apiModel);
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
export const removeTaskTC = createAppAsyncThunk<RemoveTaskArgType, RemoveTaskArgType>(
    "tasks/removeTask",
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({status: "loading"}));
            const res = await todolistsApi.deleteTask(arg);
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