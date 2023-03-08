import React, {useState} from 'react';
import '../WeekView.css';
import Modal from "./Modal";

const WeekView = ({ date, onDateClick, tasks, onToggleDone }) => {
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

    return (
        <div className="week-view">
            {daysInWeek.map((day, index) => (
                <div key={index}
                     className={`day ${day.getTime() === date.getTime() ? 'selected' : ''} ${day.getTime() < new Date().getTime() ? 'past' : 'future'}`}
                     onClick={() => handleClickDate(day)}>
                    <div className="day-label">{day.toLocaleDateString()}</div>
                    <div className="task-list">
                        {tasks && tasks[`${day.toLocaleDateString()}`] ?
                            <div>
                                Mở công việc
                            </div> : ''}
                    </div>
                </div>
            ))}

            <Modal open={open} handleClose={handleClose} date={date} tasks={tasks} onToggleDone={handleToggleModal}/>
        </div>
    );
}
export default WeekView;
