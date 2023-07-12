import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {CheckBox} from './components/CheckBox';
import s from './Todolist.module.css'

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
    changeStatus: (tasksId: string, newStatus: boolean) => void
    filter: FilterValuesType
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim());
            setTitle('');
            setError(null)
        } else {
            setError('Title is required')
            setTitle('');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask();
        }
    }
    const buttonsHandler = (name: FilterValuesType) => {
        props.changeFilter(name);
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? s.error : ''}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    const checkBoxHandler = (newStatus: boolean) => {
                        props.changeStatus(t.id, newStatus)
                    }

                    return <li className={t.isDone ? s.isDone : ''} key={t.id}>
                        <CheckBox status={t.isDone} callBack={(newStatus) => {checkBoxHandler(newStatus)}}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? s.activeButton : ''} onClick={() => buttonsHandler('all')}>All
            </button>
            <button className={props.filter === 'active' ? s.activeButton : ''}
                    onClick={() => buttonsHandler('active')}>Active
            </button>
            <button className={props.filter === 'completed' ? s.activeButton : ''}
                    onClick={() => buttonsHandler('completed')}>Completed
            </button>
        </div>
    </div>
}