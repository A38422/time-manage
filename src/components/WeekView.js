import React, {useState} from 'react';
import '../styles/WeekView.css';
import Modal from "./Modal";

const WeekView = ({ date, now, onDateClick, tasks, onToggleDone, onAddTask, onSaveTask, onRemoveTask }) => {
    const [open, setOpen] = useState(false);

    const getDaysInWeek = (date) => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i - date.getDay());
            days.push(day);
        }
        return days;
    };

    const daysInWeek = getDaysInWeek(date);

    const handleClickDate = (day) => {
        onDateClick(day);
        handleOpen();
    }

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleToggleModal = ({date, idx}) => {
        onToggleDone({day: date, idx: idx})
    };

    const handleAddTask = ({date, newTask}) => {
        onAddTask({date, newTask});
    }

    const handleSaveTask = (data) => {
        onSaveTask(data);
    }

    const handleRemoveTask = ({date, index}) => {
        onRemoveTask({date, index});
    }

    const classTask = (day) => {
        let className = 'day';
        if (day.getTime() < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
            className += ' past';
        } else {
            className += ' future';
        }
        if (tasks && tasks[day.toLocaleDateString()] && tasks[day.toLocaleDateString()].length > 0) {
            const checkDone = tasks[day.toLocaleDateString()].filter(i => i.done);
            if (checkDone.length === tasks[day.toLocaleDateString()].length) {
                className += ' bg-danger';
            } else {
                className += ' bg-yellow';
            }
        }
        if (day.getTime() === new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()) className += ' selected';

        return className;
    }

    return (
        <div className="week-view">
            {daysInWeek.map((day, index) => (
                <div key={index}
                     className={classTask(day)}
                     onClick={() => handleClickDate(day)}>
                    <div className="day-label">{day.toLocaleDateString()}</div>
                    <div style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        {tasks && tasks[day.toLocaleDateString()] && tasks[day.toLocaleDateString()].length > 0 ? "See tasks" : ''}
                    </div>
                </div>
            ))}

            <Modal open={open}
                   date={date}
                   tasks={tasks}
                   handleClose={handleClose}
                   onToggleDone={handleToggleModal}
                   onAddTask={handleAddTask}
                   onSaveTask={handleSaveTask}
                   onRemoveTask={handleRemoveTask}/>
        </div>
    );
}
export default WeekView;
