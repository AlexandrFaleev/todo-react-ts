import {useContext, memo} from "react";
import {TasksContext} from "../../context/TasksContext.tsx";
import styles from './TodoInfo.module.scss';

const TodoInfo:React.FC = () => {
    const {
        tasks,
        onDeleteAllButtonClick
    } = useContext(TasksContext);

    const totalTasks:number = tasks.length;
    const isDeleteButtonShown:boolean = totalTasks > 0


    return (
        <div className={styles.todo__info}>
            <div className={styles.todo__total}>
                Всего: {totalTasks}
            </div>
            {isDeleteButtonShown && (
                <button 
                    type="button"
                    className={styles.todo__deleteAllBtn}
                    onClick={onDeleteAllButtonClick}
                >
                    Удалить все
                </button>
            )}
        </div>
    )
}

export default memo(TodoInfo);