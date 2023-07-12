import React, {ChangeEvent} from 'react';

type CheckBoxType = {
    status: boolean
    callBack: (newStatus: boolean) => void
}

export const CheckBox = (props: CheckBoxType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
    return <input type="checkbox" checked={props.status} onChange={onChangeHandler}/>
}