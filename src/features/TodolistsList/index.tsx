import {asyncActions as todolistAsyncAction, slice} from './todolists.reducer'
import {tasksAsyncActions as tasksAsyncAction} from './tasks.reducer'

const todolistsActions = {
    ...todolistAsyncAction,
    ...slice.actions
}
const tasksActions = {
    ...tasksAsyncAction,
}
export {
    tasksActions,
    todolistsActions
}