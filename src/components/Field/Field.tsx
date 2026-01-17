import styles from './Field.module.scss';

interface FieldProps{
    inputType?:string,
    title?:string,
    value:string,
    onInput: ({target}: React.FormEvent) => void
}

const Field:React.FC<FieldProps> = ({
    inputType='text',
    title='Info...',
    value,
    onInput,
}) => {
    return (
        <div className={styles.field}>
            <input
                id="new-task-name"
                className={styles.field__input}
                autoComplete='off'
                placeholder=' '
                type={inputType}
                value={value}
                onInput={onInput}
            />
            <label 
                htmlFor="new-task-name"
                className={styles.field__label}
            >
                {title}
            </label>
        </div>
    )
}

export default Field