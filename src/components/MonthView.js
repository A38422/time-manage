import React, {useState} from 'react';
import '../styles/MonthView.css'
import Modal from './Modal';

const MonthView = ({ date, now, onDateClick, tasks, onToggleDone, onAddTask, onSaveTask, onRemoveTask }) => {
    const [open, setOpen] = useState(false);

    const getDaysInMonth = (date) => {
        let daysInMonth = [];
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const startDay = monthStart.getDay();
        if (startDay !== 0) {
            const lastDayOfPrevMonth = new Date(monthStart.getTime() - 86400000);
            const daysInPrevMonth = lastDayOfPrevMonth.getDate();
            for (let i = startDay - 1; i >= 0; i--) {
                const day = new Date(monthStart.getFullYear(), monthStart.getMonth() - 1, daysInPrevMonth - i);
                daysInMonth.push(day);
            }
        }

        for (let i = 1; i <= monthEnd.getDate(); i++) {
            const day = new Date(monthStart.getFullYear(), monthStart.getMonth(), i);
            daysInMonth.push(day);
        }

        const endDay = monthEnd.getDay();
        if (endDay !== 6) {
            for (let i = 1; i <= 6 - endDay; i++) {
                const day = new Date(monthEnd.getFullYear(), monthEnd.getMonth() + 1, i);
                daysInMonth.push(day);
            }
        }

        return daysInMonth;
    }

    const daysInMonth = getDaysInMonth(date);

    const handleClickDate = (day) => {
        onDateClick(day);
        handleOpen();
    }

    const handleOpen = () => setTimeout(() => setOpen(true), 100);

    const handleClose = () => setOpen(false);

    const handleToggleModal = ({date, idx}) => {
        onToggleDone({day: date, idx: idx})
    }

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
        if (day.getMonth() !== date.getMonth()) className += ' other-month';
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
        <div className="month-view">
            <div className="days">
                {daysInMonth.map((day, index) => (
                    <div key={index}
                         className={classTask(day)}
                         onClick={() => handleClickDate(day)}>
                        {day.getDate()}
                        <div style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                            {tasks && tasks[day.toLocaleDateString()] && tasks[day.toLocaleDateString()].length > 0 ? "See tasks" : ''}
                        </div>
                    </div>
                ))}
            </div>

            <Modal open={open}
                   date={date}
                   tasks={tasks}
                   handleClose={handleClose}
                   onToggleDone={handleToggleModal}
                   onAddTask={handleAddTask}
                   onSaveTask={handleSaveTask}
                   onRemoveTask={handleRemoveTask} />
        </div>
    );
}
export default MonthView;
