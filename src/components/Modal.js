import React, {useState, useEffect, useRef} from 'react';
import {Box, Button, Typography, Modal, Input} from '@mui/material';
import {AiOutlineClose} from 'react-icons/ai';
import {BiEdit} from 'react-icons/bi';
import {BsTrash} from 'react-icons/bs';

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

const BaseModal = ({
                       open,
                       handleClose,
                       date,
                       tasks,
                       onToggleDone,
                       onAddTask,
                       onSaveTask,
                       onRemoveTask
                   }) => {
    const [newTask, setNewTask] = useState('');

    const [editingTask, setEditingTask] = useState(null);

    const textInput = useRef();

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

    const handleSaveTask = () => {
        const data = {...editingTask, newTask: newTask};
        onSaveTask(data);
        setNewTask('');
        setEditingTask(null);
    }

    const handleCancelEdit = () => {
        setEditingTask(null);
        setNewTask('');
    }

    const handleEditTask = (event, index) => {
        event.stopPropagation();
        setEditingTask({index: index, date: date});
        setNewTask(tasks[`${date.toLocaleDateString()}`][index].text);
        textInput.current.focus();
    }

    const handleRemoveTask = (event, index) => {
        event.stopPropagation();
        onRemoveTask({date, index});
        if (editingTask && editingTask.index === index) {
            setEditingTask(null);
            setNewTask('');
        }
    }

    useEffect(() => {
        setNewTask('');
        setEditingTask(null);

        if (open && tasks && (!tasks[`${date.toLocaleDateString()}`] || !tasks[`${date.toLocaleDateString()}`].length)) {
            setTimeout(() => {
                textInput.current.focus();
            }, 150);
        }
    }, [open])

    return (
        <Modal open={open}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" component="div"
                            sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <h3>Tasks for {date.toLocaleDateString()}</h3>
                    <AiOutlineClose className="pointer" onClick={handleClose} size={24}/>
                </Typography>
                <Typography id="modal-modal-description" component="div" sx={{mt: 2}}>
                    <div className="task-list">
                        {tasks && tasks[`${date.toLocaleDateString()}`] ?
                            tasks[`${date.toLocaleDateString()}`].map((task, idx) => (
                                <div key={idx}
                                     className={`task ${task.done ? 'done' : ''}`}
                                     onClick={() => onToggleDone({date, idx})}>
                                    <span className="text-ellipsis mr-10">{task.text}</span>
                                    <div className="action-task">
                                        <BiEdit className="pointer mr-10"
                                                size={20}
                                                color={"orange"}
                                                onClick={(e) => handleEditTask(e, idx)}/>
                                        <BsTrash className="pointer"
                                                 size={20}
                                                 color={"red"}
                                                 onClick={(e) => handleRemoveTask(e, idx)}/>
                                    </div>
                                </div>
                            )) : (<span className="text-secondary">No tasks</span>)}
                    </div>

                    <div className="task-form">
                        <Input type="text"
                               inputRef={textInput}
                               value={newTask}
                               onChange={handleNewTaskChange}
                               onKeyDown={handleEnter}/>
                        {editingTask === null ? (
                            <Button variant="text"
                                    size="small"
                                    onClick={handleAddTask}>Add Task</Button>
                        ) : (
                            <>
                                <Button variant="text" onClick={handleSaveTask}>Save</Button>
                                <Button variant="text" onClick={handleCancelEdit}>Cancel</Button>
                            </>
                        )}
                    </div>
                </Typography>
            </Box>
        </Modal>
    );
}
export default BaseModal;
