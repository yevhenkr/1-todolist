import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
type TasksType = {
    [key: string]: TaskType[];
};

function App() {
    const todoListID1 = v1();
    const todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListID1, title: 'What to learn', filter: 'active'},
        {id: todoListID2, title: 'What to read', filter: 'all'}

    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ]
    });

    function removeTask(todoListID: string, taskID: string) {
        setTasks({...tasks, [todoListID]: [...tasks[todoListID].filter(task => task.id === taskID ? '' : task)]})
    }

    function addTask(todoListID: string, title: string) {
        const task = {id: v1(), title: title, isDone: true}
        setTasks({...tasks, [todoListID]: [task, ...tasks[todoListID]]})
    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
    }

    function changeStatus(todoListID: string, tasksId: string, newStatus: boolean) {
        setTasks({
            ...tasks, [todoListID]: tasks[todoListID].map(task =>
                task.id === tasksId ? {...task, isDone: newStatus} : task)
        })
    }

    function removeTodoList(todoListID: string) {
        setTodoLists([...todoLists.filter(tl => tl.id !== todoListID)])
        delete tasks[todoListID]
    }

    return (
        <div className="App">
            {todoLists.map(tl => {
                let tasksForTodolist = tasks[tl.id];

                if (tl.filter === 'active') {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                }
                return <Todolist
                    key={tl.id}
                    todoListID={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    addTask={addTask}
                    removeTodoList={removeTodoList}/>
            })}
        </div>
    );
}

export default App;