import React, {useState, useEffect} from 'react';
import './App.css';
import {Button, Input} from "@mui/material";
import WeekView from "./components/WeekView";
import MonthView from "./components/MonthView";

const App = () => {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [viewMode, setViewMode] = useState('month');
    const [tasks, setTasks] = useState(null);
    // const [newTask, setNewTask] = useState('');
    // const [editingTask, setEditingTask] = useState(null);

    const handleNext = () => {
        if (viewMode === 'week') {
            setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7));
        } else {
            setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
        }
    };

    const handlePrev = () => {
        if (viewMode === 'week') {
            setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7));
        } else {
            setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
        }
    };

    const handleToday = () => {
        setDate(new Date());
    };

    const handleDateClick = (day) => {
        setSelectedDate(day);
    };

    const handleViewModeChange = (event, mode) => {
        setViewMode(mode);
    };

    // const handleNewTaskChange = (e) => {
    //     setNewTask(e.target.value);
    // };

    const handleAddTask = ({date, newTask}) => {
        if (newTask) {
            const addTasks = {...tasks};
            if (tasks && tasks[`${date.toLocaleDateString()}`]) {
                addTasks[`${date.toLocaleDateString()}`] =  [
                    ...addTasks[`${date.toLocaleDateString()}`],
                    {
                        date: date,
                        done: false,
                        text: newTask
                    }
                ];
            } else {
                addTasks[`${date.toLocaleDateString()}`] =  [
                    {
                        date: date,
                        done: false,
                        text: newTask
                    }
                ];
            }

            setTasks(addTasks);
        }
    };

    // const handleEditTask = (index) => {
    //     setEditingTask(index);
    //     setNewTask(tasks[index].text);
    // };

    // const handleSaveTask = () => {
    //     const updatedTasks = [...tasks];
    //     updatedTasks[editingTask].text = newTask;
    //     setTasks(updatedTasks);
    //     setEditingTask(null);
    //     setNewTask('');
    // };
    //
    // const handleCancelEdit = () => {
    //     setEditingTask(null);
    //     setNewTask('');
    // };

    const handleToggleDone = ({day, idx}) => {
        const updatedTasks = {...tasks};
        updatedTasks[`${day.toLocaleDateString()}`][idx].done = !updatedTasks[`${day.toLocaleDateString()}`][idx].done;
        setTasks(updatedTasks);
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            handleAddTask();
        }
    }

    useEffect(() => {
        document.title = `Tasks for ${selectedDate.toLocaleDateString()}`;
        setDate(selectedDate);
    }, [selectedDate]);

    return (
        <div className="app">
            <header>
                <Button variant="outlined" onClick={handlePrev}>Prev</Button>
                <Button variant="outlined" onClick={handleToday}>Today</Button>
                <Button variant="outlined" onClick={handleNext}>Next</Button>
            </header>
            <div className="view-mode">
                <Button variant="outlined"
                        className={viewMode === 'week' ? 'active' : ''}
                        onClick={(event) => handleViewModeChange(event, 'week')}>Week</Button>
                <div className="mr-5"></div>
                <Button variant="outlined"
                        className={viewMode === 'month' ? 'active' : ''}
                        onClick={(event) => handleViewModeChange(event, 'month')}>Month</Button>
            </div>
            <div style={{margin: "10px"}}>
                {date.toDateString()}
            </div>
            <div className="calendar">
                <div className="days-of-week">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>
                {viewMode === 'week' ? (
                    <WeekView date={date}
                              onDateClick={handleDateClick}
                              onAddTask={handleAddTask}
                              tasks={tasks}
                              onToggleDone={handleToggleDone}/>
                ) : (
                    <MonthView date={date}
                               onDateClick={handleDateClick}
                               onAddTask={handleAddTask}
                               tasks={tasks}
                               onToggleDone={handleToggleDone}/>
                )}
            </div>
            {/*<div className="task-form">*/}
            {/*    <Input type="text" value={newTask} onChange={handleNewTaskChange} onKeyDown={handleEnter}/>*/}
            {/*    {editingTask === null ? (*/}
            {/*        <Button variant="text" size="small" onClick={handleAddTask}>Add Task</Button>*/}
            {/*    ) : (*/}
            {/*        <>*/}
            {/*            <Button variant="outlined" onClick={handleSaveTask}>Save</Button>*/}
            {/*            <Button variant="outlined" onClick={handleCancelEdit}>Cancel</Button>*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );
}
export default App;
