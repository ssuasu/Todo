import React, { useEffect, useState } from 'react';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import CreateTask from '../modals/CreateTask';
import Card from './Card';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        let arr = localStorage.getItem("taskList");

        if (arr) {
            let obj = JSON.parse(arr);
            setTaskList(obj);
        }
    }, []);

    const deleteTask = (index) => {
        let tempList = [...taskList];
        tempList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    const updateListArray = (obj, index) => {
        let tempList = [...taskList];
        tempList[index] = obj;
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    const toggle = () => {
        setModal(!modal);
    };

    const saveTask = (taskObj) => {
        taskObj.isCompleted = false; // 초기값 설정
        let tempList = [...taskList];
        tempList.push(taskObj);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        setModal(false);
    };

    return (
        <Container>
            <Typography variant="h3" align="center" gutterBottom>
                Todo List
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setModal(true)}>
                Create Task
            </Button>
            <div className="task-container">
                {taskList && taskList.map((obj, index) => (
                    <Card key={index} taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />
                ))}
            </div>
            <Dialog open={modal} onClose={toggle}>
                <DialogTitle>Create Task</DialogTitle>
                <DialogContent>
                    <CreateTask toggle={toggle} modal={modal} save={saveTask} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggle} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default TodoList;
