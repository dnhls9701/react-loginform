import { ThemeProvider } from '@emotion/react';
import {FC} from 'react';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import GlobalCss from 'components/GlobalCss';
// import EditProfile from 'components/EditProfile';
import UserList from 'components/UserList';
// import Login from 'components/Login';
// import Comment from 'components/Comment';
const App: FC = () => {

  return(
    <ThemeProvider theme={ theme }>
      <CssBaseline/>
      <GlobalCss/>
        <Box>
          {/* <EditProfile/> */}
          <UserList/>
          {/* <Comment/> */}
        </Box>
    </ThemeProvider>
  )
}
export default App;
