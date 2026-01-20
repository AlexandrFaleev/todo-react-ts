import AddTaskForm from '../AddTaskForm/AddTaskForm';
import SearchTaskForm from '../SearchTaskForm/SearchTaskForm';
import TodoInfo from '../TodoInfo/TodoInfo';
import TodoList from '../TodoList/TodoList';
import styles from './Todo.module.scss';

const Todo:React.FC = () => {

    return(
        <div className={styles.todo}>
            <h1 className={styles.todo__title}>To Do List</h1>
            <AddTaskForm />
            <SearchTaskForm />
            <TodoInfo />
            <TodoList/>
        </div>
    )
}

export default Todo;