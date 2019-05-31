const styles = ({ spacing, breakpoints, palette }) => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: spacing.unit * 3,
    marginRight: spacing.unit * 3,
    [breakpoints.up(400 + spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${spacing.unit * 2}px ${spacing.unit * 3}px ${spacing.unit * 3}px`
  },
  form: {
    width: '100%',
    marginTop: spacing.unit
  },
  submit: {
    marginTop: spacing.unit * 3,
    backgroundColor: palette.primary.dark
  },
  google: {
    display: 'block',
    position: 'space-between',
    width: '50%',
    margin: 0,
    marginTop: '1rem'
  },
  googleButton: {
    width: '90%',
    height: '100%',
    borderRadius: 4
  }
})
export default styles
