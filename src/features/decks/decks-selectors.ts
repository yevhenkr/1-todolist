import {AppRootState} from "../../app/store.ts";


export const selectDeck =(state: AppRootState)=> {
    return state.decks.decks
}