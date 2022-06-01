import globalStyle from 'assets/css/global';
import {FC, memo} from 'react';


const GlobalCss: FC = () => {
    globalStyle();
    return null;
}

export default memo(GlobalCss);