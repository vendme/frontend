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
  title: {
    position: 'relative',
    top: -theme.spacing.unit
  },
  addy: {
    fontSize: 14
  },
  pos: {
    marginBottom: 8
  },
  chip: {
    cursor: 'pointer'
  },
  cover: {
    height: '160px',
    width: '160px',
    marginRight: theme.spacing.unit * 2
  }
})

function CardInfo(props) {
  const { classes } = props
  return (
    <CardContent className={classes.content}>
      <CardMedia
        className={classes.cover}
        image="http://lorempixel.com/160/160/business"
        title="Nice Market"
      />
      <div>
        <Typography className={classes.title} variant="h5" component="h2">
          Nice Market
        </Typography>
        <Typography className={classes.addy} color="textSecondary">
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
