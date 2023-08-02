import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError(true);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div style={{
        display: "flex",
        alignItems: "flex-start",

    }}>
        <TextField
            sx={{mr: "5px"}}
            variant={"outlined"}
            size={'small'}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? "error" : ""}
            error={error}
            helperText={error ? "Please, enter title" : undefined}
        />
        <Button
            size={"small"}
            variant={"contained"}
            color={"primary"}
            onClick={addItem}
            sx={{mt: "3px"}}
        >
            <AddCircleOutlineIcon/>
        </Button>

    </div>
}
