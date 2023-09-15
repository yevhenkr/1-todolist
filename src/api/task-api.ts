import axios from 'axios'

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true
})
const instance2 = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
    headers: {}
})

export const taskAPI = {
    getTasks<GetTasksResponseType>(todolistid: string) {
        return instance.get<GetTasksResponseType  >(`todo-lists/${todolistid}/tasks`)
    },
    createTask<ResponseType>( todolistId: string,title: string) {
        return instance.post(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask<ResponseType>(taskId: string, todolistid: string) {
        return instance.delete(`todo-lists/${todolistid}/tasks/${taskId}`)
    },
    updateTask<ResponseType>(taskId: string, todolistid: string, title:string) {
        return instance.put(`todo-lists/${todolistid}/tasks/${taskId}`,{title})
    },
}

type ResponseType<T={}>={
    data: T
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode:number
}

type GetTasksResponseType<T={}>= {
    error: null | string
    items: TaskType[]
    totalCount: number
}

type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}