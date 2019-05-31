const styles = ({ spacing, theme }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  addContainer: {
    width: '100%',
    border: '1px solid red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  table: {
    maxWidth: 1000,
    marginTop: spacing.unit * 4
  },
  profile: {
    padding: spacing.unit * 2
  },
  textField: {
    width: `calc(50% - ${spacing.unit * 2}px)`,
    margin: `0 ${spacing.unit}px`
  }
})

export default styles
