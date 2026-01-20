import {useCallback, useEffect, useState, useMemo} from "react";
import useLocalStorageTasks from "./useLocalStorageTasks.ts";

interface Task{
    id:string,
    title:string,
    isDone:boolean,
}

const useTasks = () => {

    const {
        savedTasks,
        saveTasks
    } = useLocalStorageTasks()

    const [newTaskName, setNewTaskName] = useState('')
    const [queryString, setQueryString] = useState('')

    const [tasks, setTasks] = useState<Task[]>(() => {
        return savedTasks ?? [];
    });

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
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskName,
                isDone: false,
            };
            setTasks((prevTasks) => [...prevTasks, newItem]);
            setNewTaskName('');
        } else{
            setNewTaskName('');
        }
    }, [newTaskName])

    const onDeleteAllButtonClick = useCallback(() => {
        const isConfirmed = confirm('Вы действительно хотите удалить все?');
        if(isConfirmed){
            setTasks([])
            setNewTaskName('')
            setQueryString('')
        }
    }, [])

    const onDeleteItemButtonClick = useCallback((taskId:string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }, [tasks])

    const onItemCheckBoxChange = useCallback((taskId:string) => {
        setTasks(tasks.map((task) => {
            if(task.id === taskId){
                return {...task, isDone: !task.isDone}
            }

            return task
        }))
    }, [tasks])

    const filteredTasks: Task[] | null = useMemo(() => {
        return queryString.trim().length > 0 ?
            tasks.filter(task => task.title.toLowerCase().includes(queryString.trim().toLowerCase()))
            : null
    }, [queryString, tasks])

    useEffect(() => {
        saveTasks(tasks)
    }, [tasks]);

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