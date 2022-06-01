import { deepPurple} from '@mui/material/colors';
import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette:{
        primary: {
            main: deepPurple[500]
        },
        secondary:{
            main: '#f1f2f3'
        }
    },
    components:{

    }
})

export default theme;