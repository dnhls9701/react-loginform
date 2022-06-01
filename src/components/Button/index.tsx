import {FC, ReactNode, MouseEvent} from 'react';

export interface ButtonProps{
    children?: ReactNode;
    variant?: 'success' | 'primary' | 'secondary';
    onClick?(e: MouseEvent<HTMLButtonElement>): void;
}
const Button: FC<ButtonProps> = (props) => {
    const{ variant = 'secondary', onClick} = props;
    return <button className={ 'bg-' + variant} onClick={onClick}>{props.children}</button>
}

export default Button;