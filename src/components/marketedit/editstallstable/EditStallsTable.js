import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import CreateIcon from '@material-ui/icons/Create'
import CancelIcon from '@material-ui/icons/Cancel'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { renderComponent } from 'recompose';

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
    padding: '0.5rem 1.5vw',
    '&:nth-of-type(1)': {
      paddingLeft: '30px'
    }
  }
})

class EditStallsTable extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      stallsList: []
    }
    
    console.log(props.stalls)
  }

  // const [open, setOpen] = useState(false)
  // const { value:name, bind:bindName, reset:resetName } = useInput('');
  
  componentDidMount = async () => {
    // this.setState({ stallsList: this.props.stalls })
  }
  
  handleClickOpen = () => {
    this.setState({open: true})
  }
  
  handleClose = () => {
    this.setState({open: false})
  }
  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>Name</TableCell>
              <TableCell className={classes.cell}>Width (in)</TableCell>
              <TableCell className={classes.cell}>Length (in)</TableCell>
              <TableCell className={classes.cell}>Size (in&sup2;)</TableCell>
              <TableCell className={classes.cell}>Price</TableCell>
              <TableCell className={classes.cell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.stalls.map(data => (
              <TableRow key={'stall-' + data.id}>
                <TableCell className={classes.cell}>{data.stall_name}</TableCell>
                <TableCell className={classes.cell}>{data.width}</TableCell>
                <TableCell className={classes.cell}>{data.length}</TableCell>
                <TableCell className={classes.cell}>
                  {data.length * data.width}
                </TableCell>
                <TableCell className={classes.cell}>{data.stall_price}</TableCell>
                <TableCell className={classes.cell}>
                  <IconButton
                    onClick={() => this.handleClickOpen(data)}
                    color="primary"
                    className={classes.button}
                    aria-label="Edit Stall">
                    <CreateIcon />
                  </IconButton>
                  {/* <IconButton
                    onClick={() => props.removeStall(data.id)}
                    color="primary"
                    className={classes.button}
                    aria-label="Remove Stall">
                    <CancelIcon />
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Stall</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="stall_name"
              value={this.state.stall_name}
              onChange={this.props.changeHandler}
              label="Name"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="width"
              value={this.state.width}
              onChange={this.props.changeHandler}
              label="Width (in)"
              type="number"
            />
            <TextField
              autoFocus
              margin="dense"
              name="length"
              value={this.state.length}
              onChange={this.props.changeHandler}
              label="Length (in)"
              type="number"
            />
            <TextField
              autoFocus
              margin="dense"
              name="stall_price"
              value={this.state.stall_price}
              onChange={this.props.changeHandler}
              label="Price"
              type="number"
            />
            <TextField
              autoFocus
              margin="dense"
              name="description"
              value={this.state.description}
              onChange={this.props.changeHandler}
              label="Description"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            {/* <Button onClick={handleClose} color="primary"> */}
            <Button onClick={() => this.props.onEdit(this.data.id)} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    )
  }
}

EditStallsTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditStallsTable)
