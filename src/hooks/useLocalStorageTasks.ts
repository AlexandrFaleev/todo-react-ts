interface Task{
    id:string,
    title:string,
    isDone:boolean,
}

const useLocalStorageTasks = () => {
    const localStorageKey = 'todo-item'

    const saved = localStorage.getItem(localStorageKey);

    const savedTasks:Task[] | null = saved ? JSON.parse(saved) : null

    const saveTasks = (tasks:Task[]) => {
        localStorage.setItem(
            localStorageKey,
            JSON.stringify(tasks)
        )
    }

    return{
        savedTasks,
        saveTasks
    }
}

export default useLocalStorageTasks