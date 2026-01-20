import Todo from './components/Todo/Todo.tsx'
import {TasksProvider} from "./context/TasksContext.tsx";

function App() {
  return (
    <TasksProvider>
      <Todo />
    </TasksProvider>

  )
}

export default App
