import { Paper } from "@mui/material";
import { ForwardRefRenderFunction, forwardRef, useState, ChangeEvent, MouseEvent, KeyboardEvent, useEffect, useImperativeHandle } from "react";
import { SxPaper, SxFormWrapper, SxPageWrapper, SxTitle, SxButton } from "./style";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";


export interface ProfileRef{
    getValue(): { fullname: string; dob: string; username: string; password:string };
    setValue(fullname?: string, dob?: string, username?: string, password?:string): void;
    validate(): boolean;
}

export interface ProfileProps{
    fullname?: string;
    dob?: string;
    username?: string;
    password?: string;
}

export type IMessageColor = 'error' | 'success' | '';
export type IMessageField = 'fullname' | 'username' | 'password'| 'dob' | '';

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

const EditProfile: ForwardRefRenderFunction<ProfileRef, ProfileProps> = (props, ref) => {
    
    const {fullname = 'Doan Huong Lan', dob = '10/10/2001', username = 'dnhlan', password = '12345'} = props;

    const [textFullname, setTextFullName] = useState(fullname);
    const [textDOB, setTextDOB] = useState(dob);
    const [textUsername, setTextUsername] = useState(username);
    const [textPassword, setTextPassword] = useState(password);

    const [Message, setMessage] = useState<IMessage>(message(''));

    useEffect(() => {
        fullname === textFullname || setTextFullName(fullname);
        dob === textDOB ||setTextDOB(dob);
        username === textUsername ||setTextUsername(username);
        password === textPassword ||setTextPassword(password);
    }, [fullname, dob, username, password]);

    useImperativeHandle(ref, () => ({
        getValue: () => ({ fullname: textFullname, dob: textDOB, username: textUsername.trim(), password: textPassword }),
        setValue: (fullname?, dob?, username?, password?) => {
            fullname!==undefined && setTextFullName(fullname);
            dob!==undefined && setTextDOB(dob);
            username!==undefined && setTextUsername(username);
            password!==undefined && setTextPassword(password);
        },
        validate: () => validate()
    }))


    const changeFullname = (e: ChangeEvent<HTMLInputElement>) => setTextFullName(e.target.value);
    const changeDOB = (e: ChangeEvent<HTMLInputElement>) => setTextDOB(e.target.value);
    const changeUsername = (e: ChangeEvent<HTMLInputElement>) => setTextUsername(e.target.value);
    const changePassword = (e: ChangeEvent<HTMLInputElement>) => setTextPassword(e.target.value);

    const validate =  () =>{
        const username = textUsername.trim();

        if(!textFullname){
            setMessage(message('Vui lòng nhập họ tên!', 'fullname','error'));
            return false;
        }
        if(!textDOB){
            setMessage(message('Vui lòng nhập ngày tháng năm!', 'dob', 'error'));
            return false;
        }
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

    const submitChange = (e?: MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        e?.stopPropagation();
        const valid = validate();
        if(valid){
            setMessage(message('Thay đổi thành công!', '', 'success'));
            // setTimeout(() => setMessage(message('')), 3000);
        }
    }

    // console.log(textFullname, textDOB, textUsername, textPassword);


    return <Paper sx={SxPaper} className ="relative">
        <Box sx = {SxPageWrapper} className ="absolute">
            <Paper sx = {SxFormWrapper}>
                <Typography variant ="h4" component="h4" sx ={SxTitle}>
                    Edit Profile
                </Typography>
                {
                    Message.content && !Message.field && <Box sx ={{px: 2}}>
                        <Alert severity = {Message.color ? Message.color: undefined}>{Message.content}</Alert>
                    </Box>
                }
            
                <Box sx={{p:2,  '& input': { height: '50px'}}}>
                    <TextField 
                        label = "Họ tên" 
                        variant="outlined" 
                        fullWidth
                        sx ={{ mt: 2}}
                        value = {textFullname}
                        onChange ={changeFullname}
                        onKeyUp = {keyupInput}
                        helperText = { getMessage(Message, 'fullname')}
                        error = {!!getMessage(Message, 'fullname')}
                    />
                    <TextField 
                        label = "Ngày sinh" 
                        variant="outlined"  
                        fullWidth 
                        sx ={{ mt: 3}} 
                        value = {textDOB}
                        onChange ={changeDOB}
                        onKeyUp = {keyupInput}
                        helperText = { getMessage(Message, 'dob')}
                        error = {!!getMessage(Message, 'dob')}
                    />
                    <TextField 
                        label = "Tên đăng nhập" 
                        variant="outlined" 
                        fullWidth 
                        sx ={{ mt: 3}}
                        value = {textUsername}
                        onChange ={changeUsername}
                        onKeyUp = {keyupInput}
                        helperText = { getMessage(Message, 'username')}
                        error = {!!getMessage(Message, 'username')}
                    />
                    <TextField 
                        label = "Mật khẩu" 
                        variant="outlined" 
                        fullWidth 
                        sx ={{ mt: 3}}
                        value = {textPassword}
                        onChange ={changePassword}
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
                    > Edit</Button>
                </Box>
            </Paper>
        </Box>
    </Paper>;
}

export default forwardRef(EditProfile);