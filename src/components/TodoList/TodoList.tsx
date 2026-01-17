import TodoItem from '../TodoItem/TodoItem';

import styles from './TodoList.module.scss';

interface ItemProps{
    id:string,
    title:string,
    isDone:boolean,
}

interface listProps{
    items:ItemProps[],
    emptyMessageText:string,
    onDeleteItemButtonClick:(id:string) => void,
    onItemCheckBoxChange:(id:string) => void,
}

const TodoList:React.FC<listProps> = ({
    items,
    emptyMessageText,
    onDeleteItemButtonClick,
    onItemCheckBoxChange
}) => {
    if(items.length === 0){
        return(
            <div className={styles.emptyMsg}>
                {emptyMessageText}
            </div>
        )
    }
    
    return(
        <ul className={styles.todo__list}>
            {items.map((item:ItemProps) => (
                <TodoItem
                    id={item.id}
                    title={item.title}
                    isDone={item.isDone}
                    key={item.id}
                    onDeleteItemButtonClick={onDeleteItemButtonClick}
                    onItemCheckBoxChange={onItemCheckBoxChange}
                />
            ))}
        </ul>
    )
}

export default TodoList;