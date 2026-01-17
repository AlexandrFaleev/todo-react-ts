import styles from './TodoInfo.module.scss';

interface TodoInfoProps{
    totalTasks:number,
    onDeleteAllButtonClick:()=>void,
}

const TodoInfo:React.FC<TodoInfoProps> = ({
    totalTasks=0,
    onDeleteAllButtonClick,
}) => {

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

export default TodoInfo;