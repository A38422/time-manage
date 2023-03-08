import React, {useState, useEffect} from 'react';
import {Box, Button, Typography, Modal, Input} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    outline: "none",
    boxShadow: 24,
    p: 4,
};

const BaseModal = ({open, handleClose, date, tasks, onToggleDone, onAddTask}) => {
    const [newTask, setNewTask] = useState('');

    const [editingTask, setEditingTask] = useState(null);

    const handleEnter = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            handleAddTask();
        }
    }

    const handleNewTaskChange = (e) => {
        setNewTask(e.target.value);
    }

    const handleAddTask = () => {
        onAddTask({date, newTask});
        setNewTask('');
    }

    return (
        <Modal open={open}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Công viện ngày {date.toLocaleDateString()}
                </Typography>
                <Typography id="modal-modal-description" component="div" sx={{ mt: 2 }}>
                    <div className="task-list">
                        {tasks && tasks[`${date.toLocaleDateString()}`] ?
                            tasks[`${date.toLocaleDateString()}`].map((task, idx) => (
                                <div key={idx} className={`task ${task.done ? 'done' : ''}`} onClick={() => onToggleDone({date, idx})}>
                                    {task.text}
                                </div>
                            )) : (<span className="text-secondary">Không có công việc nào</span>)}
                    </div>

                    <div className="task-form">
                        <Input type="text" value={newTask} onChange={handleNewTaskChange} onKeyDown={handleEnter}/>
                        {/*{editingTask === null ? (*/}
                            <Button variant="text" size="small" onClick={handleAddTask}>Add Task</Button>
                        {/*) : (*/}
                        {/*    <>*/}
                        {/*        <Button variant="outlined" onClick={handleSaveTask}>Save</Button>*/}
                        {/*        <Button variant="outlined" onClick={handleCancelEdit}>Cancel</Button>*/}
                        {/*    </>*/}
                        {/*)}*/}
                    </div>
                </Typography>
            </Box>
        </Modal>
    );
}
export default BaseModal;
