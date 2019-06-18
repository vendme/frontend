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
    searchbar: {
      minWidth: '280px',
      ...theme,
      borderRadius: '500px',
      marginTop: spacing.unit * 4
    },
    input: {
      marginLeft: spacing.unit * 4,
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
      padding: spacing.unit,
      marginRight: spacing.unit
    },
    markets: {
      marginTop: spacing.unit * 6
    },
    market: {
      marginBottom: spacing.unit * 2
    },
    map: {
      maxWidth: 1200,
      width: '100%',
      margin: `${spacing.unit * 2}px auto`
    }
  }
}
export default styles
