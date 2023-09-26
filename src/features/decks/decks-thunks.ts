import {decksAPI} from "./decks-api.ts";
import {AppDispatch} from "../../app/store.ts";
import {setDecksAC} from "./decks-reducer.ts";

export const fetchDecksTC = () => (dispatch: AppDispatch) => {
    decksAPI.fetchDecks().then(res => {
        dispatch(setDecksAC(res.data.items))
    })
}