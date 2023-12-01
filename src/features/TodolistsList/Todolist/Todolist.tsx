import React, {useCallback, useEffect} from "react";
import {Delete} from "@mui/icons-material";
import {Button, IconButton} from "@mui/material";
import {Task} from "./Task/Task";
import {TodolistDomainType} from "features/TodolistsList/todolists.reducer";
import {TaskType} from "features/TodolistsList/todolists.api";
import {TaskStatuses} from "common/enums";
import {useAppDispatch} from "common/hooks";
import {AddItemForm, EditableSpan} from "common/components";
import {tasksActions, todolistsActions} from "../index";
import {useActions} from "../../../app/store";

type PropsType = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
    removeTask: (params: { taskId: string, todolistId: string }) => void;
};

export const Todolist = React.memo(function (props: PropsType) {
    const dispatch = useAppDispatch();
    const {changeTodolistFilter, removeTodolistTC,changeTodolistTitleTC} = useActions(todolistsActions)
    const {addTask,updateTask} = useActions(tasksActions)
    useEffect(() => {
        dispatch(tasksActions.fetchTasks(props.todolist.id));
    }, []);

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        updateTask({taskId, domainModel: {status}, todolistId});
    }, []);

    const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
        updateTask({taskId, domainModel: {title}, todolistId});
    }, []);

    const addTaskCB = useCallback(
        (title: string) => {
           addTask({title, todolistId: props.todolist.id});
        },
        [props.todolist.id],
    );

    const removeTodolist = () => {
        removeTodolistTC(props.todolist.id);
    };

    const changeTodolistTitle = useCallback(
        (title: string) => {
            changeTodolistTitleTC({id: props.todolist.id, title});
        },
        [props.todolist.id],
    );

    const onAllClickHandler = useCallback(
        () => changeTodolistFilter({filter: "all", id: props.todolist.id}),
        [props.todolist.id],
    );
    const onActiveClickHandler = useCallback(
        () => changeTodolistFilter({filter: "active", id: props.todolist.id}),
        [props.todolist.id],
    );
    const onCompletedClickHandler = useCallback(
        () => changeTodolistFilter({filter: "completed", id: props.todolist.id}),
        [props.todolist.id],
    );

    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskCB} disabled={props.todolist.entityStatus === "loading"}/>
            <div>
                {tasksForTodolist.map((t) => (
                    <Task
                        key={t.id}
                        task={t}
                        todolistId={props.todolist.id}
                        removeTask={props.removeTask}
                        changeTaskTitle={changeTaskTitle}
                        changeTaskStatus={changeStatus}
                    />
                ))}
            </div>
            <div style={{paddingTop: "10px"}}>
                <Button
                    variant={props.todolist.filter === "all" ? "outlined" : "text"}
                    onClick={onAllClickHandler}
                    color={"inherit"}
                >
                    All
                </Button>
                <Button
                    variant={props.todolist.filter === "active" ? "outlined" : "text"}
                    onClick={onActiveClickHandler}
                    color={"primary"}
                >
                    Active
                </Button>
                <Button
                    variant={props.todolist.filter === "completed" ? "outlined" : "text"}
                    onClick={onCompletedClickHandler}
                    color={"secondary"}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
});
