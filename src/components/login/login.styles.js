const styles = ({ spacing, breakpoints, palette }) => ({
  main: {
    width: '100%',
    display: 'block',
    margin: 'auto',
    [breakpoints.up(400 + spacing.unit * 3 * 2)]: {
      width: 400
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
    height: 36,
    backgroundColor: palette.primary.dark
  },
  google: {
    display: 'block',
    position: 'space-between',
    backgroundColor: 'white',
    borderRadius: 4,
    width: '50%',
    height: 36,
    margin: 0,
    marginTop: '1rem',
    [breakpoints.down(400)]: {
      width: '100%'
    }
  },
  googleButton: {
    width: '90%',
    height: '100%',
    objectFit: 'contain',
    borderRadius: 4,
    [breakpoints.down(400)]: {
      width: '100%'
    }
  }
})
export default styles
