import React, { useState } from 'react';
import { inputContainerStyles } from './style';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Input from '../Input';

export interface Props {
    handleSubmitTask: (value: string) => void;
}

export default function InputContainer({ handleSubmitTask }: Props) {
    const { container, buttonStyle, wrapper } = inputContainerStyles();

    const [valueInput, setValueInput] = useState<string>('');

    const handleChange = (value: string): void => {
        setValueInput(value);
    };

    const handleSubmit = (): void => {
        handleSubmitTask(valueInput);
    };

    return (
        <div className={container}>
            <div className={wrapper}>
                <Input onChange={handleChange} value={valueInput} />
                <Button className={buttonStyle} variant='contained' color='primary' onClick={() => handleSubmit()}>
                    <AddIcon />
                </Button>
            </div>
        </div>
    );
};
