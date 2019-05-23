import React from 'react'
import CardUI from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardInfo from './cardinfo/CardInfo'
import styles from './card.module.css'

const Card = props => {
  return (
    <CardUI className={styles.card}>
      <CardInfo />
      <Typography className={styles.motto} variant="colorSecondary">
        "This is a nice vendor that sells nice things"
      </Typography>
    </CardUI>
  )
}

export default Card
