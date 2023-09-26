import s from './DecksList.module.css'
import {DeckItem} from "./DeckItem/DeckItem.tsx";
import {useFetchDecks} from "./DeckItem/useFetchDecks.ts";

export const DecksList = () => {
    const {decks} =useFetchDecks()

    return <ul className={s.list}>
        {decks.map(deck => {
            return <DeckItem deck={deck}/>;
        })}
    </ul>
}
