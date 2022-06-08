import { amber } from '@mui/material/colors';
import {SxProps, Theme} from '@mui/system';

export const SxPaper: SxProps<Theme> = {
    height: '100vh',
    width: 'width: calc(100vw - 21px)',
    bgcolor: 'secondary.main'
}

export const SxPageWrapper: SxProps<Theme> = {
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',

}

export const SxFormWrapper: SxProps<Theme> = {
    width: '400px', 
    minHeight: '500px', 
    maxWidth: 'calc(100vw-3rem)', 
    maxHeight: 'calc(100vh-3rem)',
    mt: 2,
    borderRadius: '0.5rem'
}


export const SxTitle: SxProps<Theme> = { 
    textAlign: 'center', 
    textTransform: 'uppercase', 
    py:2, 
    color: 'primary.main',
    marginTop: '0.5rem'
}

export const SxButton: SxProps<Theme> = {
    '&:hover': {
        bgcolor: amber[500],
        color: 'primary.main'
    },
    mt: 3
}
