import {useContext, memo} from "react";
import {TasksContext} from "../../context/TasksContext.tsx";
import styles from './TodoItem.module.scss';


interface ItemProps{
    id:string,
    title:string,
    isDone:boolean,
}

const TodoItem:React.FC<ItemProps> = ({
    id,
    title,
    isDone,
}) => {

    const {
        onDeleteItemButtonClick,
        onItemCheckBoxChange
    } = useContext(TasksContext)


    return(
        <li className={`todo__item ${styles.todoItem}`}>
            <input
                type="checkbox"
                id={id}
                className={styles.todoItem__checkbox}
                checked={isDone}
                onChange={() => onItemCheckBoxChange(id, !isDone)}
            />
            <label
                htmlFor={id}
                className={styles.todoItem__label}
            >
                {title}
            </label>
            <button
                type="button"
                className={styles.todoItem__deleteBtn}
                aria-label="Удалить"
                title="Удалить"
                onClick={() => onDeleteItemButtonClick(id)}
            >
                <span></span>
                <span></span>
            </button>
        </li>
    )
}

export default memo(TodoItem);