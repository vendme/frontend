// import { fade } from '@material-ui/core/styles/colorManipulator'
const drawerWidth = 240

const styles = theme => {
  return {
    root: {
      display: 'flex'
      // backgroundColor: fade('#fff7f7', 0.5),
      // backgroundImage:
      //   'url("https://www.transparenttextures.com/patterns/egg-shell.png")'
      // backgroundImage:
      //   'url("https://www.transparenttextures.com/patterns/handmade-paper.png")'
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
      backgroundColor: theme.palette.primary.dark
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    menuButtonHidden: {
      display: 'none'
    },
    title: {
      flexGrow: 1,
      fontFamily: 'Pacifico',
      fontSize: 30
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: 0,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing.unit * 7
      }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      padding: theme.spacing.unit * 3,
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      overflowX: 'hidden'
    },
    switchLabel: {
      '& span': { color: theme.palette.common.white }
    }
  }
}

export default styles
