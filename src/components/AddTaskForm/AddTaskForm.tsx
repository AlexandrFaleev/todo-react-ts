import React, {useContext} from 'react';
import {TasksContext} from "../../context/TasksContext.tsx";
import Field from '../Field/Field';
import Button from '../Button/Button';
import styles from './AddTaskForm.module.scss';

const AddTaskForm:React.FC = () => {
    const {
        onAddTaskFormSubmit,
        newTaskName,
        onNewTaskFieldInput,
    } = useContext(TasksContext)

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