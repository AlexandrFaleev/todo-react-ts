import Field from '../Field/Field';
import styles from './SearchTaskForm.module.scss';
import {useContext} from "react";
import {TasksContext} from "../../context/TasksContext.tsx";

const SearchTaskForm:React.FC = () => {
    const {
        queryString,
        onSearchInput
    } = useContext(TasksContext)

    return(
        <form 
            className={styles.todo__form}
            onSubmit={(event: React.FormEvent) => event.preventDefault()}
        >
            <Field
                inputType="search"
                title="Поиск задачи..."
                value={queryString}
                onInput={onSearchInput}
            />
        </form>
    )
}

export default SearchTaskForm;