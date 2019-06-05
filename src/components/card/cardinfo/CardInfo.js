import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'

const styles = theme => {
  let type = theme.palette.type === 'dark'
  let chipTheme = {
    color: !type ? theme.palette.grey['A700'] : theme.palette.secondary.light,
    border: !type && 'none',
    backgroundColor: fade(
      type ? '#000' : theme.palette.common.black,
      type ? 0 : 0.15
    )
  }
  return {
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
      ...chipTheme
    },
    cover: {
      height: '160px',
      width: '160px',
      marginRight: theme.spacing.unit * 2
    }
  }
}

function CardInfo(props) {
  const { classes, info } = props
  console.log(info)
  return (
    <CardContent className={classes.content}>
      <CardMedia
        className={classes.cover}
        image="http://lorempixel.com/160/160/business"
        title="Market"
      />
      <div>
        <Typography className={classes.title} variant="h5" component="h2">
          {`${(info && info.user_vendor) ||
            info.market_name ||
            `Unnamed store`}`}
        </Typography>
        <Typography className={classes.addy} color="textSecondary">
          {info && info.address}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {`${info && info.city ? info.city + ',' : 'city,'} ${
            info && info.state ? info.state : 'state'
          } ${
            info && info.zip_code
              ? info.zip_code.split``.splice(0, 5).join``
              : 'zip code'
          }`}
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
