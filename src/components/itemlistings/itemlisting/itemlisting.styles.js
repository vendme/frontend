const styles = ({ spacing, palette, breakpoints }) => {
  console.log(palette)
  return {
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: spacing(-3)
    },
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%'
      // transform: `translate(50%, -50%)`
    },
    blurBox: {
      position: 'fixed',
      width: '100%',
      maxHeight: 350,
      margin: 'auto',
      overflow: 'hidden',
      zIndex: -1
    },
    picturesContainer: {
      background: palette.grey['900'],
      backgroundSize: 'cover',
      width: '100%',
      height: 350,
      maxWidth: '100%',
      margin: 'auto',
      filter: 'blur(8px) brightness(0.4)'
    },
    pictures: {
      width: '100%',
      maxWidth: '100%',
      margin: 'auto',
      marginBottom: spacing(3)
    },
    picture: {
      width: 350,
      height: 350,
      maxWidth: 350,
      margin: 'auto'
    },
    about: {
      width: 650,
      maxWidth: 650,
      margin: 'auto'
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
    description: {
      // margin: spacing(1)
    },
    info: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    price: {
      fontWeight: 'bold',
      margin: spacing(1)
    },
    priceBox: {
      fontSize: spacing(2),
      fontWeight: 'bold',
      border: '1px solid ' + palette.secondary.main,
      borderRadius: 100,
      padding: spacing(1),
      marginRight: spacing(2)
    },
    divider: {
      margin: spacing(2, 0, 2, 0)
    }
  }
}
export default styles
