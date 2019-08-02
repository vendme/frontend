const styles = ({ spacing, palette }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  grid: {
    width: '60%'
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
    marginBottom: spacing(2),
    color: palette.grey['600']
  },
  profile: {
    width: '100%',
    maxWidth: 600,
    padding: spacing(2),
    marginBottom: spacing(4)
  },
  address: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  textField: {
    width: `calc(50% - ${spacing(2)}px)`
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    margin: spacing(1),
    marginTop: spacing(2),
    marginRight: 0
  },
  list: {
    display: 'flex',
    alignItems: 'space-between',
    flexDirection: 'column',
    width: '100%'
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})

export default styles
