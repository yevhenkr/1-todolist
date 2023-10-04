import {Dispatch} from "redux";
import {isAxiosError} from "axios";
import {setAppError} from "../../app/app-reducer.ts";

export const handlerError = (e: unknown, dispatch: Dispatch) => {
    let errorMessage = ''
    if (isAxiosError<ServerError>(e)) {
        errorMessage = e.response
            ? e.response.data.errorMessages[0].message
            : e.message
    } else {
        errorMessage = (e as Error).message
    }
    dispatch(setAppError(errorMessage))
}

type ServerError = {
    errorMessages: Array<{
        message: string
    }>
}