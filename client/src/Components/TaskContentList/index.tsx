import React, { useState, useEffect } from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
} from '@material-ui/core';
import { PropsTask } from '../../interfaces/tasks';
import { searchStyles } from './style';
import { Edit, CheckCircle, Close, DeleteOutline } from '@material-ui/icons';

export interface Props {
    tasks: PropsTask[] | [];
    openModalEditTask: (item: PropsTask) => void;
    handleDeleteTask: (id: number) => void;
}

export default function TasksContentList({ tasks, openModalEditTask,handleDeleteTask }: Props) {
    const { container, card, textContent, textNotTasks,spanTextContent,cardContent } = searchStyles();

    const [resultTasks, setResultTasks] = useState<PropsTask[]>(tasks);

    useEffect(() => {
        setResultTasks([]);
        setResultTasks(tasks);
    }, [tasks]);

    return (
        <div className={container}>
            {resultTasks.length > 0 ? resultTasks?.map((item: PropsTask, index: number) => (
                <Card key={index} className={card}>
                    <CardContent className={cardContent}>
                        <Typography variant="h4" className={textContent}>
                            {item.title}  
                        </Typography>
                        <span className={spanTextContent}>{item.completed ? <CheckCircle color='secondary' /> : <Close color='error' />}</span>
                    </CardContent>
                    <CardActions>
                        <Button variant='contained' color='primary' onClick={() => openModalEditTask(item)}>
                            <Edit />
                        </Button>
                        <Button variant='contained' color='primary' onClick={() => handleDeleteTask(item?.id)}>
                            <DeleteOutline color='error' />
                        </Button>
                    </CardActions>
                </Card>
            )) : <Typography variant="h4" className={textNotTasks}>
                Nenhuma tarefa encontrada
            </Typography>}
        </div>
    );
};
