import { createTheme } from '@mui/material/styles';
import {blue, green, purple} from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        primary: {
            main: blue[600],
        },
        secondary: {
            main: green[500],
        },
        blue : {
            main : 'blue'
        }
    },
});