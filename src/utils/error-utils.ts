import {setErrorAC, SetErrorType, setStatusAC, SetStatusType} from '../app/app-reducer'
import {Dispatch} from 'redux'
import {ResponseType} from '../api/todolists-api'

// generic function
export const handleServerAppError = <T>(dispatch: ErrorUtilsDispatchType, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, errorMessage: string) => {
    dispatch(setErrorAC(errorMessage))
    dispatch(setStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetErrorType | SetStatusType>