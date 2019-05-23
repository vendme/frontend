import { fade } from '@material-ui/core/styles/colorManipulator'
const styles = ({ spacing, palette, transitions, breakpoints }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
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
    marginTop: spacing.unit * 4
  },
  table: {
    maxWidth: 1000,
    marginTop: spacing.unit * 4
  },
  searchbar: {
    backgroundColor: fade(palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(palette.common.white, 0.25)
    },
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
  }
})

export default styles
