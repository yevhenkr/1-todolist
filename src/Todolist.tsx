import React, {useState} from 'react'

type FilterValueType = 'All' | 'Active' | 'Completed'

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (index: number) => void
}

export function Todolist(props: PropsType) {
    let [filter, setFilters] = useState('All')

    let drushlack = props.tasks
    const filterChange = (filter: FilterValueType) => {
        setFilters(filter);
    }
    if (filter === 'Active') {
        drushlack = props.tasks.filter(t => t.isDone === true)
    }
    if (filter === 'Completed') {
        drushlack = props.tasks.filter(t => t.isDone === false)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {drushlack.map((el, index) => {
                return <li key={el.id}>
                    <input type="checkbox" checked={el.isDone}/>
                    <span>{el.title}</span>
                    <button onClick={() => props.removeTask(el.id)}>X</button>
                </li>
            })}
        </ul>
        <div>
            <button onClick={() => filterChange('All')}>All</button>
            <button onClick={() => filterChange('Active')}>Active</button>
            <button onClick={() => filterChange('Completed')}>Completed</button>
        </div>
    </div>
}