const styles = ({ spacing, palette }) => ({
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
    width: '100%',
    maxWidth: 600
  },
  titles: {
    display: 'block',
    width: '100%',
    maxWidth: 600
  },
  subtitles: {
    display: 'block',
    width: '100%',
    maxWidth: 600,
    marginBottom: spacing.unit * 2,
    color: palette.grey['600']
  },
  profile: {
    width: '100%',
    maxWidth: 600,
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
