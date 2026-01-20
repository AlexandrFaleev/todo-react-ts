import {useCallback, useEffect, useState, useMemo} from "react";
import tasksAPI from "../api/TasksAPI.ts";

interface Task{
    id:string | null,
    title:string,
    isDone:boolean,
}

const useTasks = () => {
    const [newTaskName, setNewTaskName] = useState('')
    const [queryString, setQueryString] = useState('')

    const [tasks, setTasks] = useState<Task[]>([]);

    const onNewTaskFieldInput = ({target}:any) => {
        setNewTaskName(target.value)
    }

    const onSearchInput = ({target}: any) => {
        setQueryString(target.value)
    }

    const onAddTaskFormSubmit = useCallback((event:any) => {
        event.preventDefault();

        const formattedNewTaskName=newTaskName.trim();

        if(formattedNewTaskName.length > 0){
            const newItem = {
                title: newTaskName,
                isDone: false,
            };

            tasksAPI.add(newItem).then((addedTask:any) => {
                    setTasks((prevTasks) => [...prevTasks, addedTask]);
                    setNewTaskName('');
                })
        } else{
            setNewTaskName('');
        }
    }, [newTaskName])

    const onDeleteAllButtonClick = useCallback(() => {
        const isConfirmed = confirm('Вы действительно хотите удалить все?');
        if(isConfirmed){
            tasksAPI.deleteAll(tasks).then(() => setTasks([]))
            setNewTaskName('')
            setQueryString('')
        }
    }, [tasks])

    const onDeleteItemButtonClick = useCallback((taskId:string) => {
       tasksAPI.delete(taskId).then(() => {
            setTasks(
                tasks.filter(task => task.id !== taskId)
            )
        })
    }, [tasks])

    const onItemCheckBoxChange = useCallback((taskId:string, isDone:boolean) => {
        tasksAPI.toggleTaskComplete(taskId, isDone).then(() => {
            setTasks(tasks.map((task) => {
                if(task.id === taskId){
                    return {...task, isDone: !task.isDone}
                }

                return task
            }))
        })
    }, [tasks])

    const filteredTasks: Task[] | null = useMemo(() => {
        return queryString.trim().length > 0 ?
            tasks.filter(task => task.title.toLowerCase().includes(queryString.trim().toLowerCase()))
            : null
    }, [queryString, tasks])

    useEffect(() => {
        tasksAPI.getAll().then(setTasks)
    }, [])

    return{
        tasks,
        filteredTasks,
        onDeleteAllButtonClick,
        onDeleteItemButtonClick,
        onItemCheckBoxChange,
        onAddTaskFormSubmit,
        newTaskName,
        onNewTaskFieldInput,
        queryString,
        onSearchInput,
    }
}

export default useTasks