import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer.";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleErrorUtils=<D>(dispatch:Dispatch, data:ResponseType<D>)=>{
    if (data.messages.length > 0) {
        dispatch(setAppErrorAC(data.messages[0]))
    }
    else{
        dispatch(setAppErrorAC("Some error occurred"))
    }
    dispatch(setAppStatusAC("failed"))
}