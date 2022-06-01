import { ThemeProvider } from '@emotion/react';
import {FC} from 'react';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import GlobalCss from 'components/GlobalCss';
import EditProfile from 'components/EditProfile';

const App: FC = () => {

  return(
    <ThemeProvider theme={ theme }>
      <CssBaseline/>
      <GlobalCss/>
        <Box>
          <EditProfile/>
        </Box>
    </ThemeProvider>
  )
}
export default App;
