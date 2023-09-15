import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/task-api";

export default {
    title: 'API'
}
const options = {withCredentials: true}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const createTasksHandler = () => {
        taskAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={"TodolistId"} value={todolistId}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
        <input placeholder={"Title"} value={title}
               onChange={(e) => {
                   setTitle(e.currentTarget.value)
               }}/>
        <div>
            <button onClick={createTasksHandler}>Create Task</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")

    const getTasksHandler = () => {
        taskAPI.getTasks(todolistId)
            .then((res) => {

                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={"TodolistId"} value={todolistId}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
        <div>
            <button onClick={getTasksHandler}>Get Tasks</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")

    const deleteTasksHandler = () => {
        taskAPI.deleteTask(taskId, todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={"TodolistId"} value={todolistId}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
        <input placeholder={"TaskId"} value={taskId}
               onChange={(e) => {
                   setTaskId(e.currentTarget.value)
               }}/>
        <div>
            <button onClick={deleteTasksHandler}>Delete Task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const updateHandler = () => {
        taskAPI.updateTask(taskId, todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={"TodolistId"} value={todolistId}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
        <input placeholder={"TaskId"} value={taskId}
               onChange={(e) => {
                   setTaskId(e.currentTarget.value)
               }}/>
        <input placeholder={"NewTitle"} value={title}
               onChange={(e) => {
                   setTitle(e.currentTarget.value)
               }}/>
        <div>
            <button onClick={updateHandler}>Update Task</button>
        </div>
    </div>
}