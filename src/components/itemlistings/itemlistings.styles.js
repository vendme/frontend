const styles = ({ spacing, palette, transitions, breakpoints }) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    item: {
      width: 300,
      maxWidth: 300,
      margin: spacing(1)
    },
    cover: {
      paddingTop: '100%',
      width: '100%',
      maxHeight: '100%',
      marginRight: spacing(2),
      marginBottom: spacing(1),
      [breakpoints.down(800)]: {
        height: 'auto',
        width: 'auto',
        minWidth: 120
      }
    },
    name: {
      margin: spacing(1)
    },
    price: {
      fontWeight: 'bold',
      margin: spacing(1)
    },
    title: {
      padding: spacing(4)
    }
  }
}
export default styles
