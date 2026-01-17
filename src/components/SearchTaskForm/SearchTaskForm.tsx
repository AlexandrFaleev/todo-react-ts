import Field from '../Field/Field';
import styles from './SearchTaskForm.module.scss';

interface SearchTaskFormProps{
    queryString:string,
    onSearchInput:({target}: React.FormEvent) => void,
}

const SearchTaskForm:React.FC<SearchTaskFormProps> = ({
    queryString,
    onSearchInput
}) => {
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