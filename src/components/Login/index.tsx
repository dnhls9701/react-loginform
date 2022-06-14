import { forwardRef, useImperativeHandle, ForwardRefRenderFunction, ChangeEvent, useState, useEffect, MouseEvent, KeyboardEvent, useRef } from 'react';
import { SxPaper, SxFormWrapper, SxPageWrapper, SxTitle, SxButton } from "./style";
import { Alert, Box, Button, Paper, TextField, Typography } from '@mui/material';

export interface LoginRef{
    setLoginValue(username: string, password: string): void;
    getLoginValue(): { username: string; password: string };
    validate(): boolean;

}
export interface LoginProps{
    username?: string;
    password?: string;
}

export type IMessageColor = 'error' | 'success' | '';
export type IMessageField = 'username' | 'password'| '';

export interface IMessage{
    content: string;
    color: IMessageColor;
    field: IMessageField;
}

const message = (
    content: string, 
    field: IMessageField = '', 
    color: IMessageColor = ''
): IMessage => ({ content, field ,color });

const getMessage = (message: IMessage, field: IMessageField) => message.field === field ? message.content: '';

const Login: ForwardRefRenderFunction<LoginRef, LoginProps> = (props, ref) => {
    const {username, password} = props;

    const [textUsername, setTextUsername] = useState(username);
    const [textPassword, setTextPassword] = useState(password);

    const [Message, setMessage] = useState<IMessage>(message(''));

    useEffect(() => {
        username === textUsername ||setTextUsername(username);
        password === textPassword ||setTextPassword(password);
    }, [username, password]);

    const changeUsernameInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTextUsername(e.target.value);
    }
    const changePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTextPassword(e.target.value);
    }

    useImperativeHandle(ref, () => ({
        getLoginValue: () => ({username: textUsername?.trim()!, password: textPassword!}),
        setLoginValue: (username?, password?) => {
            username!==undefined && setTextUsername(username);
            password!==undefined && setTextPassword(password);
        },
        validate: () => validate()
    }))

    const submitChange = (e?: MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        e?.stopPropagation();
        const valid = validate();
        if(valid){
            setMessage(message('Đăng nhập thành công!', '', 'success'));
            // setTimeout(() => setMessage(message('')), 3000);
        }
    }

    const validate =  () =>{
        const username = textUsername?.trim()!;

        if(!username){
            setMessage(message('Vui lòng nhập tên đăng nhập!', 'username','error'));
            return false;
        }
        if(username.length > 8) {
            setMessage(message('Tên đăng nhập không được vượt quá 8 ký tự!', 'username','error'));
            return false;
        }
        if (username.length < 3) {
            setMessage(message('Tên đăng nhập phải có ít nhất 3 ký tự!', 'username','error'));
            return false;
        }
        if(!textPassword) {
            setMessage(message('Vui lòng nhập mật khẩu!', 'password', 'error'));
            return false;
        }
        if(textPassword.length < 3) {
            setMessage(message('Mật khẩu phải có ít nhất 3 ký tự!', 'password', 'error'));
            return false;
        }
        if(textPassword.length > 24) {
            setMessage(message('Mật khẩu không được vượt quá 24 ký tự!', 'password', 'error'));
            return false;
        }

        setMessage(message(''));
        return true;
    }

    const keyupInput = (e: KeyboardEvent<HTMLInputElement>) => e.code === 'Enter' && submitChange();

    return(
        <Paper sx={SxPaper} className ="relative">
            <Box sx = {SxPageWrapper} className ="absolute">
                <Paper sx = {SxFormWrapper}>
                    <Typography variant ="h4" component="h4" sx ={SxTitle}>
                        Login
                    </Typography>
                    
                    {
                    Message.content && !Message.field && <Box sx ={{px: 2}}>
                        <Alert severity = {Message.color ? Message.color: undefined}>{Message.content}</Alert>
                    </Box>
                    }
                    <Box sx={{p:2,  '& input': { height: '50px'}}}>
                        <TextField 
                            label = "Tên đăng nhập" 
                            variant="outlined" 
                            fullWidth 
                            sx ={{ mt: 3}}
                            value = {username}
                            onChange ={changeUsernameInput}
                            onKeyUp = {keyupInput}
                            helperText = { getMessage(Message, 'username')}
                            error = {!!getMessage(Message, 'username')}
                        />
                        <TextField 
                            label = "Mật khẩu" 
                            variant="outlined" 
                            fullWidth 
                            sx ={{ mt: 3}}
                            value = {password}
                            onChange ={changePasswordInput}
                            onKeyUp = {keyupInput}
                            helperText = { getMessage(Message, 'password')}
                            error = {!!getMessage(Message, 'password')}
                        />
                        <Button 
                            variant = "contained"
                            color ="primary"
                            fullWidth
                            sx ={SxButton}
                            onClick = {submitChange}
                        > Login</Button>
                    </Box>
                </Paper>
            </Box>
        </Paper>
    )
}

export default forwardRef(Login); 