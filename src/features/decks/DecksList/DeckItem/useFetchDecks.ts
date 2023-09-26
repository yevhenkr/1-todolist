import {useAppDispatch, useAppSelector} from "../../../../app/store.ts";
import {selectDeck} from "../../decks-selectors.ts";
import {useEffect} from "react";
import {fetchDecksTC} from "../../decks-thunks.ts";

export const useFetchDecks = () => {
    const dispatch = useAppDispatch()
    const decks = useAppSelector(selectDeck)

    useEffect(() => {
        dispatch(fetchDecksTC())
    }, [])

    return {decks}
}