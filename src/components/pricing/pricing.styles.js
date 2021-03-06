const styles = theme => {
  return {
    '@global': {
      ul: {
        margin: 0,
        padding: 0
      },
      li: {
        listStyle: 'none'
      }
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    toolbar: {
      flexWrap: 'wrap'
    },
    toolbarTitle: {
      flexGrow: 1
    },
    link: {
      // margin: theme.spacing(0, 2.5)
    },
    heroContent: {
      padding: theme.spacing(8, 0, 6)
    },
    cardHeader: {
      backgroundColor:
        theme.palette.type === 'dark'
          ? theme.palette.grey[900]
          : theme.palette.grey[400]
    },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing(2)
    },
    footer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(8),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6)
      }
    }
  }
}

export default styles
