import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff755a',
      main: '#ff3d2e',
      dark: '#c30002',
      contrastText: '#fff'
    },
    secondary: {
      light: '#cef0f9',
      main: '#9dbdc6',
      dark: '#6e8d95',
      contrastText: '#272F32'
    },
    typography: {
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        'Pacifico'
      ].join(',')
    },
    type: 'dark'
  }
})

export default theme
