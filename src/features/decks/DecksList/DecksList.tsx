import s from './DecksList.module.css'
import {useEffect} from "react";
import {decksAPI} from "../decks-api.ts";
import {useAppDispatch, useAppSelector} from "../../../app/store.ts";
import {setDecksAC} from "../decks-reducer.ts";
import {selectDeck} from "../decks-selectors.ts";
import {DeckItem} from "./DeckItem/DeckItem.tsx";

export const DecksList = () => {
    const dispatch = useAppDispatch()
    const decks = useAppSelector(selectDeck)

    useEffect(() => {
        decksAPI.fetchDecks().then(res => {
            dispatch(setDecksAC(res.data.items))
        })
    }, [])
    return <ul className={s.list}>
        {decks.map(deck => {
            return <DeckItem deck={deck}/>;
        })}
    </ul>
}
