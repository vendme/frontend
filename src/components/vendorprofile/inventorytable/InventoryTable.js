import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
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

let id = 0
function createData(quantity, description, item) {
  id += 1
  return { id, quantity, description, item }
}

function InventoryTable(props) {
  const { classes } = props
  const data = props.items.map(item => {
    return createData(item.quantity, item.description, item.item)
  })
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell}>Item</TableCell>
            <TableCell className={classes.cell}>Description</TableCell>
            <TableCell className={classes.cell}>QTY</TableCell>
            <TableCell className={classes.cell} />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(data => (
            <TableRow key={data.id}>
              <TableCell className={classes.cell}>{data.item}</TableCell>
              <TableCell className={classes.cell}>{data.description}</TableCell>
              <TableCell className={classes.cell}>{data.quantity}</TableCell>
              <TableCell className={classes.cell}>
                <IconButton
                  color="primary"
                  className={classes.button}
                  aria-label="Add to shopping cart">
                  <ShoppingCartIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

InventoryTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(InventoryTable)
