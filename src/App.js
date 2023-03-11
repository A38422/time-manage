import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {Button} from "@mui/material";
import WeekView from "./components/WeekView";
import MonthView from "./components/MonthView";
import './styles/App.css';

const App = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const now = new Date();
    const tasksLocalStorage = window.localStorage.getItem("tasks") || null;
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [time, setTime] = useState(now);
    const [date, setDate] = useState(now);
    const [selectedDate, setSelectedDate] = useState(now);
    const [tasks, setTasks] = useState(JSON.parse(tasksLocalStorage));
    const [viewMode, setViewMode] = useState(() => {
        return location.pathname === "/month" ? "month" : "week";
    });

    const handleNext = () => {
        if (viewMode === 'week') {
            setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7));
        } else {
            setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
        }
    }

    const handlePrev = () => {
        if (viewMode === 'week') {
            setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7));
        } else {
            setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
        }
    }

    const handleToday = () => {
        setDate(new Date());
    }

    const handleDateClick = (day) => {
        setSelectedDate(day);
    }

    const handleViewModeChange = (event, mode) => {
        if (mode === 'month') {
            navigate("/month");
        } else {
            navigate("/");
        }
        setViewMode(mode);
    }

    const handleAddTask = ({date, newTask}) => {
        if (newTask) {
            const addTasks = {...tasks};
            if (tasks && tasks[date.toLocaleDateString()]) {
                addTasks[date.toLocaleDateString()] = [
                    ...addTasks[date.toLocaleDateString()],
                    {
                        done: false,
                        text: newTask
                    }
                ];
            } else {
                addTasks[date.toLocaleDateString()] = [
                    {
                        done: false,
                        text: newTask
                    }
                ];
            }
            setTasks(addTasks);
        }
    }

    const handleToggleDone = ({day, idx}) => {
        const updatedTasks = {...tasks};
        updatedTasks[day.toLocaleDateString()][idx].done = !updatedTasks[day.toLocaleDateString()][idx].done;
        setTasks(updatedTasks);
    }

    const handleEditTask = (data) => {
        const updatedTasks = {...tasks};
        updatedTasks[data.date.toLocaleDateString()][data.index].text = data.newTask;
        setTasks(updatedTasks);
    }

    const handleRemoveTask = ({date, index}) => {
        const updatedTasks = {...tasks};
        updatedTasks[date.toLocaleDateString()].splice(index, 1);
        setTasks(updatedTasks);
    }

    useEffect(() => {
        document.title = `Present ${selectedDate.toLocaleDateString()}`;
        setDate(selectedDate);
    }, [selectedDate]);

    useEffect(() => {
        window.localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks])

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="app">
            <header>
                <Button variant="outlined" onClick={handlePrev}>Prev</Button>
                <Button variant="outlined" onClick={handleToday}>Today</Button>
                <Button variant="outlined" onClick={handleNext}>Next</Button>
            </header>
            <div className="clock">
                <p>{time.toLocaleTimeString()}</p>
                {time.toDateString()}
            </div>
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
                {monthNames[date.getMonth()]} {date.getFullYear()}
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
                              tasks={tasks}
                              now={now}
                              onDateClick={handleDateClick}
                              onAddTask={handleAddTask}
                              onSaveTask={handleEditTask}
                              onRemoveTask={handleRemoveTask}
                              onToggleDone={handleToggleDone}/>
                ) : (
                    <MonthView date={date}
                               tasks={tasks}
                               now={now}
                               onDateClick={handleDateClick}
                               onAddTask={handleAddTask}
                               onSaveTask={handleEditTask}
                               onRemoveTask={handleRemoveTask}
                               onToggleDone={handleToggleDone}/>
                )}
            </div>
            <div style={{margin: "10px"}}>
                {new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() === new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
                    ? 'Today'
                    : `${daysOfWeek[date.getDay()]} ${date.getDate()}`}
            </div>
            <div className="note">
                <div className="item-note">
                    <div className="color-box"></div>
                    No tasks
                </div>
                <div className="item-note">
                    <div className="color-box box-selected"></div>
                    Selected Date
                </div>
                <div className="item-note">
                    <div className="color-box box-yellow"></div>
                    Have a tasks
                </div>
                <div className="item-note">
                    <div className="color-box box-danger"></div>
                    Complete the tasks
                </div>
            </div>
        </div>
    );
}
export default App;
