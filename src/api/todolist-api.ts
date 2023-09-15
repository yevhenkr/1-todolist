import axios from 'axios'

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true
})
const instance2 = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
    headers: {}
})

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>("todo-lists")
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title: title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            {title}
        )
    },
}

type TodolistType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number
}

type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    message: string[]
    resultCode: number
}