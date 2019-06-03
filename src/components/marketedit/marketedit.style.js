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
    width: '50%',
    padding: spacing.unit * 2,
    marginBottom: spacing.unit * 4
  },
  address: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  textField: {
    width: `calc(50% - ${spacing.unit * 2}px)`
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    margin: spacing.unit,
    marginTop: spacing.unit * 2,
    marginRight: 0
  }
})

export default styles
