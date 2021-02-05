import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';
import Icon from '../icon/Icon';
import '../custom.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Button = withStyles({
  root: {
    textTransform: 'capitalize',
    '&:hover': {

    }
  },
  label: {
    fontSize: '12px',
    lineHeight: '18px',
    fontFamily: 'Poppins'
  }
})(MuiButton);

const useStyles = makeStyles({
  root: {

  },
  cancelBtn: {
    color: '#f34e3a'
  },
  saveBtn: {
    color: '#3a88fe'
  }
})


export default function SaveCancelBox(props) {
  const classes = useStyles();

  const { handleCancel, onSave } = props;
  return (
    <div className="d-flex justify-content-end mt-2">
      <Button
        className={classes.cancelBtn}
        startIcon={<Icon name="cancel1" />}
        onClick={() => handleCancel()}
      >
        Cancel
      </Button>
      <Button
        className={classes.saveBtn}
        startIcon={<Icon name="check-circle" />}
        onClick={() => onSave()}
      >
        Save
      </Button>
    </div>
  )
}