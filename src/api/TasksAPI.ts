const URL = 'http://localhost:3001/tasks'

const headers = {
    'Content-Type': 'application/json'
}

const TasksAPI = {
    getAll: () => {
        return fetch(URL).then((response:Response) => response.json())
    },

    add: (task:any) => {
        return fetch(URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(task)
        }).then((response:Response) => response.json())
    },

    delete: (id:string) => {
        return fetch(`${URL}/${id}`, {method: 'DELETE'})
    },

    deleteAll: (tasks:any[]) => {
        return Promise.all(
            tasks.map(({id}) => {
                return fetch(`${URL}/${id}`, {method: 'DELETE'})
            })
        )
    },

    toggleTaskComplete: (id:string, isDone:boolean) => {
        return fetch(`${URL}/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({isDone})
        })
    }
}

export default TasksAPI