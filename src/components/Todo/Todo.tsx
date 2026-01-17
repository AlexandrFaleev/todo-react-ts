import { useEffect, useState } from 'react';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import SearchTaskForm from '../SearchTaskForm/SearchTaskForm';
import TodoInfo from '../TodoInfo/TodoInfo';
import TodoList from '../TodoList/TodoList';
import styles from './Todo.module.scss';

interface Task{
    id:string,
    title:string,
    isDone:boolean,
}

const Todo:React.FC = () => {
    const localStorageKey='todo-item';

    const [newTaskName, setNewTaskName] = useState('')
    const [queryString, setQueryString] = useState('')
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem(localStorageKey);
        return saved ? JSON.parse(saved) : [];
    });
    const [filteredTasks, setFilteredTasks] = useState<Task[] | null>(null)

    const emptyMessageText = filteredTasks?.length === 0 ? 'Задачи не найдены!'
        : tasks.length === 0 ? 'У вас пока нет задач!'
            : ''

    function addItem(){
        const formattedNewTaskName=newTaskName.trim();
        
        if(formattedNewTaskName.length > 0){
            const newItem = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskName,
                isDone: false,
            };
            setTasks([...tasks, newItem]);
            setNewTaskName('');
        } else{
            setNewTaskName('');
        }
    };

    function filterTasks(){
        if(queryString.trim().length > 0){
            setFilteredTasks(tasks.filter(
                task => task.title
                            .toLowerCase()
                            .includes(queryString.trim().toLowerCase())

            ))
        } else{
            setQueryString('')
            setFilteredTasks(null)
        }
    }

    const onNewTaskFieldInput = ({target}:any) => {
        setNewTaskName(target.value)
    }

    const onSearchInput = ({target}: any) => {
        setQueryString(target.value)
    }

    const onAddTaskFormSubmit = (event:any) => {
        event.preventDefault();
        addItem();
    };

    const onDeleteAllButtonClick = () => {
        const isConfirmed = confirm('Вы действительно хотите удалить все?');
        if(isConfirmed)
            setTasks([])
    }

    const onDeleteItemButtonClick = (taskId:string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    };

    const onItemCheckBoxChange = (taskId:string) => {
        setTasks(tasks.map((task) => {
            if(task.id === taskId){
                return {...task, isDone: !task.isDone}
            }

            return task
        }))
    }

    useEffect(() => {
        localStorage.setItem(
            localStorageKey,
            JSON.stringify(tasks)
        )
        filterTasks()
    }, [tasks, queryString]);

    return(
        <div className={styles.todo}>
            <h1 className={styles.todo__title}>To Do List</h1>
            <AddTaskForm 
                onAddTaskFormSubmit={onAddTaskFormSubmit}
                newTaskName={newTaskName}
                onNewTaskFieldInput={onNewTaskFieldInput}
            />
            <SearchTaskForm
                queryString={queryString}
                onSearchInput={onSearchInput}
            />
            <TodoInfo 
                totalTasks={tasks.length}
                onDeleteAllButtonClick={onDeleteAllButtonClick}
            />
            <TodoList
                items={filteredTasks ?? tasks}
                emptyMessageText={emptyMessageText}
                onDeleteItemButtonClick={onDeleteItemButtonClick}
                onItemCheckBoxChange={onItemCheckBoxChange}
            />
        </div>
    )
}

export default Todo;