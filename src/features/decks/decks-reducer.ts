import {Deck} from "./decks-api.ts";

const initialState = {
    decks: [] as Deck[], // todo: add type
    searchParams: {
        name: '',
    },
}

type DecksState = typeof initialState


export type DecksActions = ReturnType<typeof setDecksAC>


export const decksReducer = (state: DecksState = initialState, action: DecksActions): DecksState => {
    switch (action.type) {
        case 'DECKS/GET-DECKS':
            return {
                ...state,
                decks: action.decks
            }
        default:
            return state
    }
}

export const setDecksAC = (decks: Deck[]) => {
    return {type: "DECKS/GET-DECKS" as const, decks}
}