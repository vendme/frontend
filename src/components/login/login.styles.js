const styles = ({ spacing, breakpoints, palette }) => ({
  main: {
    width: '100%',
    display: 'block',
    margin: 'auto',
    [breakpoints.up(400 + spacing(6))]: {
      width: 400
    }
  },
  paper: {
    marginTop: spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: spacing(2, 3, 3)
  },
  form: {
    width: '100%',
    marginTop: spacing
  },
  submit: {
    marginTop: spacing(3),
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
