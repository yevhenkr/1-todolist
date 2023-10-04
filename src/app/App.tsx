import './App.css'
import {Decks} from '../features/decks/Decks.tsx'
import {GlobalError} from './GlobalError/GlobalError.tsx'
import {useAppSelector} from "./store.ts";
import {selectAppStatus} from "./app-selectors.ts";
import {LinearLoader} from "../common/components/Loader/LinearLoader.tsx";
import * as React from "react";

export const App = () => {
    const appStatus = useAppSelector(selectAppStatus)
    return (
        <div>
            <List item={["hyml", "frfr"]} renderItem={(item) => item.toUpperCase()}/>
            <List item={[1.4, 2.5, 3]} renderItem={(item) => item.toFixed()}/>
            <List item={[{name: "Mikola"}]} renderItem={(item) => item.name()}/>
            {appStatus === "loading" && <LinearLoader/>}
            <Decks/>
            <GlobalError/>
        </div>
    )
}

type ListProps<T> = {
    item: T[]
    renderItem: (item: T) => React.ReactNode
}

function List<T>(props: ListProps<T>) {
    return (
        <ul>
            {props.item.map((item, index) => (
                <li key={index}>{props.renderItem(item)}</li>
            ))}
        </ul>
    )
}