const styles = ({ spacing, palette, transitions, breakpoints }) => {
  return {
    uploadButtons: {
      display: 'flex',
      justifyContent: 'flex-start',
      width: '100%',
      marginTop: '1rem'
    },
    button: {
      margin: `0px ${spacing(1)}px ${spacing(1)}px 0px`
    },
    picture: {
      width: '100%',
      maxWidth: '500px',
      objectFit: 'contain'
    }
  }
}
export default styles
