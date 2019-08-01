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
    titles: {
      display: 'block',
      width: '100%',
      marginTop: spacing(2),
      maxWidth: 750
    },
    subtitles: {
      display: 'block',
      width: '100%',
      maxWidth: 750,
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
    vendors: {
      marginTop: spacing(2)
    },
    vendor: {
      marginBottom: spacing(2)
    },
    map: {
      maxWidth: 1200,
      width: '100%',
      margin: `${spacing(2)}px auto`
    }
  }
}
export default styles
