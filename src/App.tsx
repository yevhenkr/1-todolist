import React from 'react';
import Todolist from './Todolist';
import './App.css';

function App() {
    const truck0='What to lern1'
    const truck1='What to lern22'
    const truck2=100200
    const truck3=true

    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "ReactJS", isDone: false },
        { id: 5, title: "ReactJS", isDone: false },
        { id: 6, title: "ReactJS", isDone: false },
        { id: 7, title: "ReactJS", isDone: false },
        { id: 8, title: "ReactJS", isDone: false },
        { id: 9, title: "ReactJS", isDone: false },
        { id: 10, title: "ReactJS", isDone: false },
    ]
    const tasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false }
    ]
    return (
        <div className="App">
            <Todolist truck={truck0} truck2={truck2} tasks={tasks1}/>
            <Todolist truck={truck1} truck3={truck3} tasks={tasks2}/>
        </div>
    );
}

export default App;
