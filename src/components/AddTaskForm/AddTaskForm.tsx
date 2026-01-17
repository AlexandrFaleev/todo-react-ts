import Field from '../Field/Field';
import Button from '../Button/Button';
import styles from './AddTaskForm.module.scss';
import React from 'react';

interface AddTaskFormProps{
    onAddTaskFormSubmit: (event: React.FormEvent) => void,
    newTaskName:string,
    onNewTaskFieldInput: ({target}: React.FormEvent) => void,
}

const AddTaskForm:React.FC<AddTaskFormProps> = ({
    onAddTaskFormSubmit,
    newTaskName,
    onNewTaskFieldInput,
}) => {
    return(
        <form className={styles.todo__form} onSubmit={onAddTaskFormSubmit}>
            <Field
                title="Название задачи..."
                value={newTaskName}
                onInput={onNewTaskFieldInput}
            />
            <Button
                type="submit"
            >
                Добавить
            </Button>
        </form>
    )
}

export default AddTaskForm;