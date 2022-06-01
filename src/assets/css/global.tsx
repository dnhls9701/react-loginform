import {makeStyles}  from '@mui/styles';

const globalStyle = makeStyles(() => ({
    '@global': {
        '*': {
            boxSizing: "border-box!important"
        }
    }
}));

export default globalStyle;