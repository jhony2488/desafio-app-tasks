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
        setTasks(task, false).catch(() => {
            const storedData = localStorage.getItem('tasks');
            const taskGet = JSON.parse(storedData || '');
            localStorage.setItem('tasks', JSON.stringify([{ id: taskGet.lenght, title: task, completed: false }, ...taskGet]));
            setTasksApi([{ id: taskGet.lenght, title: task, completed: false }, ...taskGet]);
        });
    };

    const handleSubmitEditTask = async (taskTitle: string, taskCompleted: boolean) => {
        let indexNumber: number;
        await updateTask(task?.id || 0, taskTitle, taskCompleted).catch(async () => {
            const storedData = await localStorage.getItem('tasks');
            const taskGet = await JSON.parse(storedData || '');
            await taskGet.filter((item: { id: number; }, index: number) => {
                if (item.id === task?.id) {
                    indexNumber = index;
                }
                return item;
            });
            await console.log(taskTitle, taskCompleted);
            taskGet[indexNumber] = await { id: task?.id, title: taskTitle, completed: taskCompleted };
            setTasksApi(taskGet);
        });
        closeModal();
    };

    const handleSubmitDeleteTask = async (id: number) => {
        let indexNumber: number;
        await deleteTask(id).catch(async () => {
            const storedData = await localStorage.getItem('tasks');
            const taskGet = await JSON.parse(storedData || '');
            await taskGet.filter((item: { id: number; }, index: number) => {
                if (item.id === id) {
                    indexNumber = index;
                }
                return item;
            });

            await taskGet.splice(indexNumber, 1);
            setTasksApi(taskGet);
        });
    };

    const handleModal = (getTask: PropsTask): void => {
        setOpenModal(!openModal);
        setTask(getTask);

        setInputCompleted(getTask.completed);
    };
    const closeModal = (): void => {
        setOpenModal(!openModal);
    };

    useEffect(() => {
        const storedData = localStorage.getItem('tasks');
        getTasks().then((response) => setTasksApi(response.data.result)).catch((err) => {
            if (storedData) {
                setTasksApi(JSON.parse(storedData));
            }
            else {
                setTasksApi(mockedTasks);
            }

            console.log(err);
        });
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        setInputTitle(task?.title || '');
    }, [task]);

    return (
        <>
            <Modal
                open={openModal}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.box}>
                    <Box className={classes.boxWrapper}>
                        <Typography id="modal-modal-title" className={classes.titleModal} variant="h6" component="h2">
                            Tarefa
                        </Typography>
                        <label htmlFor="input-title">
                            Titulo
                        </label>
                        <Input id="input-title" value={inputTitle || ''} onChange={setInputTitle} />

                        <FormControlLabel control={<Checkbox checked={inputCompleted} onChange={(event) => setInputCompleted(event.target.checked ? true : false)} />} label="Completada" />
                        <div className={classes.containerButtons}>
                            <Button variant='contained' color='primary' onClick={() => handleSubmitEditTask(inputTitle, inputCompleted)}>
                                Editar
                            </Button>
                            <Button variant='contained' color='inherit' onClick={() => closeModal()}>
                                Sair
                            </Button>
                        </div>
                    </Box>
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
