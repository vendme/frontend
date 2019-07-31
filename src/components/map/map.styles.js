const styles = theme => {
  return {
    popup: {
      position: 'absolute',
      background: 'white',
      color: 'black',
      filter: 'drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2))',
      padding: '15px',
      borderRadius: '10px',
      border: '1px solid #cccccc',
      bottom: '12px',
      left: '-50px',
      minWidth: '280px'
    },
    closer: {
      textDecoration: 'none',
      position: 'absolute',
      top: '2px',
      right: '8px'
    }
  }
}

export default styles
