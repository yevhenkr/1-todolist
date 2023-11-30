import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {FilterValuesType, todolistsActions, todolistsThunks} from "features/TodolistsList/todolists.reducer";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "common/components";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {useAppDispatch} from "common/hooks";
import {selectIsLoggedIn} from "features/auth/auth.selectors";
import {selectTasks} from "features/TodolistsList/tasks.selectors";
import {selectTodolists} from "features/TodolistsList/todolists.selectors";
import {TaskStatuses} from "common/enums";
import {useActions} from "../../app/store";
import {tasksActions, todolistActions} from "./index";

export const TodolistsList = () => {
    const todolists = useSelector(selectTodolists);
    const tasks = useSelector(selectTasks);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const {addTaskTC, removeTaskTC, updateTaskTC,fetchTasksTC } = useActions(tasksActions)
    const {addTodolistTC, removeTodolistTC, fetchTodolistsTC,changeTodolistTitleTC } = useActions(todolistActions)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        fetchTodolistsTC();
    }, []);

    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        removeTaskTC({taskId, todolistId});
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        addTaskTC({title, todolistId});
    }, []);

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        updateTaskTC({taskId, domainModel: {status}, todolistId});
    }, []);

    const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
        updateTaskTC({taskId, domainModel: {title}, todolistId});
    }, []);

    const changeFilter = useCallback(function (filter: FilterValuesType, id: string) {
        dispatch(todolistsActions.changeTodolistFilterAC({id, filter}));
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        removeTodolistTC(id);
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        changeTodolistTitleTC({id, title});
    }, []);

    const addTodolist = useCallback(
        (title: string) => {
            addTodolistTC(title);
        },
        [dispatch],
    );

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>;
    }

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id];

                    return (
                        <Grid item key={tl.id}>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    todolist={tl}
                                    tasks={allTodolistTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};
