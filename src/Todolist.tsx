import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEventHandler, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from './components/Button';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (type: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState<string>('');
    const changeFilter = (filter: FilterValuesType) => {
        props.changeFilter(filter)
    }
    const removeTaskH = (tID: string) => {
        props.removeTask(tID)
    }
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const handleKeyDown = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(title)
            setTitle('')
        }
    }
    const mappedTask =
        props.tasks.map(t => {
            return (<li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => {
                    removeTaskH(t.id)
                }}>x
                </button>
            </li>)
        })


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandle}
                   onKeyDown={handleKeyDown}
            />
            <button onClick={(e) => {
                addTaskHandler()
            }}>+
            </button>
        </div>
        <ul>
            {mappedTask}
        </ul>
        <div>
            <Button callBack={() => changeFilter('active')} name={'active'}/>
            <Button callBack={() => changeFilter('all')} name={'all'}/>
            <Button callBack={() => changeFilter('completed')} name={'completed'}/>
            <Button callBack={() => changeFilter('completed')} name={'completed'}/>
        </div>
    </div>
}