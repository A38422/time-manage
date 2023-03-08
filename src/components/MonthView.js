import React, {useState} from 'react';
import '../MonthView.css'
import Modal from './Modal';

const MonthView = ({ date, onDateClick, tasks, onToggleDone, onAddTask }) => {
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
    };

    const daysInMonth = getDaysInMonth(date);

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

    return (
        <div className="month-view">
            <div className="days">
                {daysInMonth.map((day, index) => (
                    <div key={index}
                         className={`day ${day.getMonth() === date.getMonth() ? '' : 'other-month'} ${ day.getTime() === date.getTime() ? 'selected' : '' } ${day.getTime() < new Date().getTime() ? 'past' : 'future'}`}
                         onClick={() => handleClickDate(day)}>
                        {day.getDate()}
                        <div className="task-list">
                            {tasks && tasks[`${day.toLocaleDateString()}`] ?
                            <div>
                                Mở công việc
                            </div> : ''}
                        </div>
                    </div>
                ))}
            </div>

            <Modal open={open}
                   handleClose={handleClose}
                   date={date}
                   tasks={tasks}
                   onToggleDone={handleToggleModal}
                   onAddTask={handleAddTask}/>
        </div>
    );
}
export default MonthView;
