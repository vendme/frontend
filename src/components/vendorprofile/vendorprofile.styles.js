import { fade } from '@material-ui/core/styles/colorManipulator'
const styles = ({ spacing, palette, transitions, breakpoints }) => {
  let theme = {
    backgroundColor: fade(
      palette.type === 'dark' ? palette.common.white : palette.common.black,
      0.15
    ),
    '&:hover': {
      backgroundColor: fade(
        palette.type === 'dark' ? palette.common.white : palette.common.black,
        0.25
      )
    }
  }
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    },
    editcontainer: {
      position: 'relative',
      zIndex: '100'
    },
    edit: {
      position: 'absolute',
      top: spacing(0.5),
      left: spacing(0.5)
    },
    editsymbol: {
      background: 'rgba(1,1,1, 0.5)',
      borderRadius: '50%',
      padding: spacing(0.3),
      color: 'white'
    },
    profimg: {
      border: '1px solid gray',
      borderRadius: '.25rem',
      background: 'aliceblue',
      width: '100px',
      height: '100px'
    },
    marketinfo: {
      padding: 0,
      listStyle: 'none'
    },
    availinfo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: spacing(4)
    },
    table: {
      maxWidth: 800
    },
    titles: {
      display: 'block',
      width: '100%',
      maxWidth: 800
    },
    subtitles: {
      display: 'block',
      width: '100%',
      maxWidth: 800,
      marginBottom: spacing(2),
      color: palette.grey['600']
    },
    searchbar: {
      minWidth: '280px',
      ...theme,
      borderRadius: '500px',
      marginTop: spacing(4)
    },
    input: {
      marginLeft: spacing(4),
      flex: 1,
      transition: transitions.create('width'),
      [breakpoints.up('sm')]: {
        width: 220,
        '&:hover': {
          width: 400
        }
      }
    },
    iconButton: {
      padding: spacing(1),
      marginRight: spacing(1)
    },
    stall: {
      padding: spacing(2)
    }
  }
}

export default styles
