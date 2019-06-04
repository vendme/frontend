const styles = ({ spacing, breakpoints, palette }) => ({
  container: {
    maxWidth: 600,
    padding: spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  form: {
    display: 'flex',
    alignItems: 'flex-end',
    [breakpoints.down('600')]: {
      flexDirection: 'column',
      width: '100%'
    }
  },
  textFieldStalls: {
    padding: spacing.unit,
    [breakpoints.down('600')]: {
      width: '100%'
    }
  }
})
export default styles
