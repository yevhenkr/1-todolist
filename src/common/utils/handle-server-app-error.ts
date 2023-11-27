import {Dispatch} from "redux";
import {appActions} from "app/app.reducer";
import {BaseResponseType} from "common/types/common.types";

/**
 * Функция для обработки ошибок в приложении
 * @param data - 111
 * @param dispatch - 2222
 * @param showGlobalError - іііі
 * @returns{void} - sssssssssssssssssss
 */
export const handleServerAppError = <D>(data: BaseResponseType<D>, dispatch: Dispatch, showGlobalError = true) => {
    if (showGlobalError) {
        dispatch(appActions.setAppError(data.messages.length ? {error: data.messages[0]} : {error: "Some error occurred"}));
    }
    dispatch(appActions.setAppStatus({status: "failed"}));
};
