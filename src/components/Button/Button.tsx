import styles from './Button.module.scss';

interface ButtonProps{
    type?: "button" | "submit",
    children?:any,
}

const Button:React.FC<ButtonProps> = ({
    type='button',
    children=''
}) => {
    return (
        <button
            type={type}
            className={styles.button}
        >
            {children}
        </button>
    )
}

export default Button;