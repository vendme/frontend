const styles = ({ spacing }) => ({
  marketcard: {
    display: 'flex',
    alignItems: 'center'
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
    alignItems: 'center'
  },
  table: {
    marginTop: spacing.unit * 4
  }
})

export default styles
