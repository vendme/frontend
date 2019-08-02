import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
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
      type ? '#000' : theme.palette.secondary.light,
      type ? 0 : 0.35
    )
  }
  return {
    content: {
      display: 'flex',
      alignItems: 'center',
      maxWidth: 400,
      padding: 0
    },
    info: {
      width: 200,
      wordWrap: 'break-word',
      [theme.breakpoints.down(800)]: {
        width: 'auto',
        maxWidth: 200
      }
    },
    title: {
      position: 'relative',
      top: -theme.spacing(2),
      lineHeight: `${theme.spacing(3)}px`
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
      height: 160,
      width: 160,
      minWidth: 160,
      minHeight: 160,
      marginRight: theme.spacing(2),
      [theme.breakpoints.down(800)]: {
        height: 'auto',
        width: 'auto',
        minWidth: 120
      }
    }
  }
}

function CardInfo(props) {
  const { classes, info, match } = props
  const [hours, setHours] = useState('No Hours Posted')

  useEffect(
    _ => {
      if (info.hours_open) {
        const pattern = /\s*;\s*/
        const allTimes = info.hours_open.split(pattern)
        const converted = allTimes.map(times => {
          console.log(times)
          times = times.split`,`
          return times.map(time => {
            if (time === 'null') {
              return 'Closed'
            }
            time = Number(time)
            if (!null && time > 1200) {
              time = time - 1200 + 'pm'
              time = [
                time.slice(0, [time.length - 4]),
                ':',
                time.slice([time.length - 4])
              ].join('')
            }
            if (!null && time <= 1200) {
              time = time + 'am'
              time = [
                time.slice(0, [time.length - 4]),
                ':',
                time.slice([time.length - 4])
              ].join('')
            }
            return time
          })
        })
        setHours(String(converted[new Date().getDay()]).replace(/,/gi, ' - '))
      }
    },
    [info.hours_open]
  )

  return (
    <CardContent className={classes.content}>
      <CardMedia
        className={classes.cover}
        image={info.market_map_file || 'http://lorempixel.com/160/160/business'}
        title="Market"
      />
      <div className={classes.info}>
        <Typography className={classes.title} variant="h6" component="h2">
          {`${(info && info.vendor_name) ||
            (info && info.market_name) ||
            `Unnamed vendor`}`}
        </Typography>
        <Typography className={classes.addy} color="textSecondary">
          {info && info.address}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {`${info && info.city ? info.city + ',' : ''} ${
            info && info.state ? info.state : ''
          } ${
            info && info.zip_code
              ? info.zip_code.split``.splice(0, 5).join``
              : ''
          }`}
        </Typography>
        {info.hours_open && match.path.includes('/marketprofile') ? (
          <Chip
            className={classes.chip}
            color="secondary"
            variant="outlined"
            label={hours}
          />
        ) : null}
      </div>
    </CardContent>
  )
}

CardInfo.propTypes = {
  classes: PropTypes.object.isRequired
}

const CardInfoWithStyles = withStyles(styles)(CardInfo)
export default withRouter(CardInfoWithStyles)
