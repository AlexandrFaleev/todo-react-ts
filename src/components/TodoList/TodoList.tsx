import TodoItem from '../TodoItem/TodoItem';
import {  useContext, memo } from "react";
import {TasksContext} from "../../context/TasksContext.tsx";

import styles from './TodoList.module.scss';


interface ItemProps{
    id:string,
    title:string,
    isDone:boolean,
}

const TodoList:React.FC = () => {
    const { tasks, filteredTasks } = useContext(TasksContext);

    const emptyMessageText:any = filteredTasks?.length === 0 ? 'Задачи не найдены'
            : tasks.length === 0 ? 'У вас пока нет задач!'
                : ''

    if((filteredTasks ?? tasks).length === 0){
        return(
            <div className={styles.emptyMsg}>
                {emptyMessageText}
            </div>
        )
    }
    
    return(
        <ul className={styles.todo__list}>
            {(filteredTasks ?? tasks).map((item:ItemProps) => (
                <TodoItem
                    id={item.id}
                    title={item.title}
                    isDone={item.isDone}
                    key={item.id}
                />
            ))}
        </ul>
    )
}

export default memo(TodoList);