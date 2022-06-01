import {forwardRef, ForwardRefRenderFunction} from 'react';
import Paper from '@mui/material/Paper';
import {SxPaper} from './style';
import Box from '@mui/material/Box';

export interface FormRef{

}

export interface FormProps{

}
const Form: ForwardRefRenderFunction<FormRef, FormProps> = (props, ref) => {
    return <Paper sx={SxPaper} className ="relative">
        <Box className="absolute">
            <Paper sx={{width:'400px', height: '500px', maxWidth: 'calc(100vw - 3rem)', maxHeight: 'calc(100vh -3rem)'}}>

            </Paper>
        </Box>
    </Paper>
}

export default forwardRef(Form);