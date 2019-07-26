import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CreateIcon from '@material-ui/icons/Create'
import CancelIcon from '@material-ui/icons/Cancel'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  },
  cell: {
    padding: '0.5rem 2vw',
    '&:nth-of-type(1)': {
      paddingLeft: '30px'
    }
  }
})

function EditItemsTable(props) {
  const { classes } = props
  const data = props.items

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell}>Item</TableCell>
            <TableCell className={classes.cell}>Description</TableCell>
            <TableCell className={classes.cell}>Price</TableCell>
            <TableCell className={classes.cell} />
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map(data => (
            <TableRow key={'items-' + data.id}>
              <TableCell className={classes.cell}>{data.product_name}</TableCell>
              <TableCell className={classes.cell}>{data.product_description}</TableCell>
              <TableCell className={classes.cell}>{data.product_price}</TableCell>
              <TableCell className={classes.cell}>
                <IconButton
                  color="primary"
                  className={classes.button}
                  aria-label="Edit Item">
                  <CreateIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  className={classes.button}
                  onClick={ () => props.removeItem(data.id) }
                  aria-label="Remove Item">
                  <CancelIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

EditItemsTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditItemsTable)
