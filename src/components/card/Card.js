import React from 'react'
import CardUI from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import CardInfo from './cardinfo/CardInfo'

const style = theme => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 800,
    margin: 'auto',
    padding: 0,
    '&div': {
      padding: 0
    },
    '&div: last - child': {
      padding: 0
    }
  },
  motto: {
    color: theme.palette.secondary.light,
    margin: 'auto',
    maxWidth: 400,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    [theme.breakpoints.down(800)]: {
      display: 'none',
      width: 0,
      padding: 0
    }
  }
})

const Card = props => {
  const { classes, info } = props
  return (
    <CardUI className={classes.card}>
      <CardInfo info={info} />
      <Typography className={classes.motto} color="secondary">
        {(info && info.bio && info.bio.substring(0, 100) + '...') ||
          (info &&
            info.market_info &&
            info.market_info.substring(0, 100) + '...') ||
          'This is a nice vendor that sells nice things'}
      </Typography>
    </CardUI>
  )
}

export default withStyles(style)(Card)
