import React from 'react'
import CardUI from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import CardInfo from './cardinfo/CardInfo'
import styles from './card.module.css'

const style = theme => ({
  motto: {
    color: theme.palette.secondary.light,
    margin: 'auto',
    maxWidth: 400,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4
  }
})

const Card = props => {
  const { classes, info } = props
  return (
    <CardUI className={styles.card}>
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
