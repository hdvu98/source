import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        "fontFamily": "\"Montserrat\", sans-serif",
    },
    palette: {
        primary:{
            main:'#01c1f2',
            dark: '#0092b7'
        } ,
        secondary:{
            main: '#0092b7'
        }
    },

});

export default theme;