import React, { useState, useEffect } from 'react';
import { Typography, Container, Modal, Box, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import { InputContainer, TasksContentList, Input } from '../../Components';
import { setTasks, getTasks, updateTask, deleteTask } from '../../services/tasks';
import { mockedTasks } from '../../utils/mockedValues';
import { PropsTask } from '../../interfaces/tasks';
import { useStyles } from './style';

export default function Home() {
    const classes = useStyles();

    const [tasks, setTasksApi] = useState<PropsTask[]>([]);
    const [task, setTask] = useState<PropsTask>();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [inputTitle, setInputTitle] = useState<string>('');
    const [inputCompleted, setInputCompleted] = useState<boolean>(false);

    const handleSubmit = (task: string): void => {
        setTasks(task, false);
    };

    const handleSubmitEditTask = (taskTitle: string, taskCompleted: boolean): void => {
        updateTask(task?.id || 0, taskTitle, taskCompleted);
    };

    const handleSubmitDeleteTask = (id: number): void => {
        deleteTask(id);
    };

    const handleModal = (getTask: PropsTask): void => {
        setOpenModal(!openModal);
        setTask(getTask);
    };

    useEffect(() => {
        getTasks().then((response) => setTasksApi(response.data.result)).catch((err) => {
            setTasksApi(mockedTasks);
            console.log(err);
        });
    }, []);

    return (
        <>
            <Modal
                open={openModal}
                onClose={handleModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Tarefa
                    </Typography>
                    <label htmlFor="input-title">
                        Titulo
                    </label>
                    <Input id="input-title" value={task?.title || ''} onChange={setInputTitle} />

                    <FormControlLabel control={<Checkbox onChange={(event) => setInputCompleted(event.target.checked ? true : false)} />} label="Completada" />
                    <Button variant='contained' color='primary' onClick={() => handleSubmitEditTask(inputTitle, inputCompleted)}>
                        Editar
                    </Button>
                </Box>
            </Modal>
            <Container className={classes.main}>
                <Typography className={classes.title}>
                    Tarefas
                </Typography>
                <InputContainer handleSubmitTask={handleSubmit} />
                <TasksContentList tasks={tasks} openModalEditTask={handleModal} handleDeleteTask={handleSubmitDeleteTask} />
            </Container>
        </>
    );
}
