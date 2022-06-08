import { forwardRef, useImperativeHandle } from 'react';
import { ForwardRefRenderFunction } from 'react';
import { ChangeEvent, useState, useEffect, useRef} from 'react';

export interface InputRef{
    setValue(value: string): void;
    getValue(): string;
}

export interface InputProps{
    type?: 'text'| 'password';
    value?: string;
    onChange?( value: string, e?: ChangeEvent<HTMLInputElement>): void;
}

const Input: ForwardRefRenderFunction<InputRef, InputProps> = (props, ref) => {
    const { onChange, type = 'password', value = '' } = props;
    const [ currentValue, setCurrentValue ] = useState(value);
    const mounted = useRef(false);
    const eventRef = useRef<ChangeEvent<HTMLInputElement>>();

    useEffect(() => {
        value === currentValue || setCurrentValue(value);
    }, [ value ]);

    useEffect(() => {
        if(mounted.current){
            //console.log({eventRef});
            onChange && onChange(currentValue, eventRef.current);
        }
        mounted.current = true;
    }, [currentValue]);
    
    useImperativeHandle(ref, () => ({
        setValue(value) {
            setCurrentValue(value);
        },
        getValue() {
            return currentValue;
        }
    }));

    const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
        eventRef.current = e;
        setCurrentValue( e.target.value );
    }
        
    return <input type ={type} value = {currentValue} onChange={ changeInput }/>
}

export default forwardRef(Input);