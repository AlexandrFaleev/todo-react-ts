import {createContext} from "react";
import useTasks from "../hooks/useTasks.ts";

interface Task{
    id:string,
    title:string,
    isDone:boolean,
}

interface TasksContextType{
    tasks:Task[],
    filteredTasks:Task[] | null,
    onDeleteAllButtonClick: () => void,
    onDeleteItemButtonClick: (taskId:string) => void,
    onItemCheckBoxChange: (taskId:string) => void,
    onAddTaskFormSubmit: (event:any) => void,
    newTaskName: string,
    onNewTaskFieldInput: ({target}:any) => void,
    queryString:string,
    onSearchInput:({target}:any) => void,
}

export const TasksContext = createContext<TasksContextType>({} as TasksContextType)

export const TasksProvider = ({children}:{children:any}) => {

    const {
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
    } = useTasks()

    return (
        <TasksContext.Provider
            value={{
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
            }}
        >
            {children}
        </TasksContext.Provider>
    )
}