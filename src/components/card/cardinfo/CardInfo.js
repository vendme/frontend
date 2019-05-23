import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  content: {
    display: 'flex',
    alignItems: 'center'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 8
  },
  chip: {
    cursor: 'pointer'
  },
  cover: {
    height: '125px',
    width: '125px',
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit
  }
})

function CardInfo(props) {
  const { classes } = props

  return (
    <CardContent className={classes.content}>
      <CardMedia
        className={classes.cover}
        image="http://lorempixel.com/200/200/business"
        title="Nice Market"
      />
      <div>
        <Typography variant="h5" component="h2">
          Nice Market
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          123 Address St.
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Nice City, State
        </Typography>
        <Chip
          className={classes.chip}
          color="secondary"
          variant="outlined"
          label="Open: 9am-6pm"
        />
      </div>
    </CardContent>
  )
}

CardInfo.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CardInfo)
