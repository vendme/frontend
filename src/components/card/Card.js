import React from 'react'
import CardUI from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import CardInfo from './cardinfo/CardInfo'
import styles from './card.module.css'

const style = theme => ({
  motto: {
    color: theme.palette.secondary.light,
    margin: 'auto'
  }
})

const Card = props => {
  const { classes, mktInfo } = props
  return (
    <CardUI className={styles.card}>
      <CardInfo />
      <Typography className={classes.motto} color="secondary">
        {mktInfo ? mktInfo.bio : 'This is a nice vendor that sells nice things'}
      </Typography>
    </CardUI>
  )
}

export default withStyles(style)(Card)
