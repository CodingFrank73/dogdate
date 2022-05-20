import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";

import { useState } from "react"

import apiBaseUrl from "../../api"

export default function AlertDialog(props) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (e) => {
    console.log("token", props.token)
    try {
      const response = await fetch(apiBaseUrl + "/api/users/myProfile/deleteAccount/", {
        method: "DELETE",
        headers: {
          token: "JWT " + props.token,
          "Content-Type": "application/json"
        },
      })

      const result = await response.json()

      if (!result.err) {
        console.log("successfully deleted!!")
        navigate("/signup")
        return
      }

      if (result.err.validationErrors) {
        const firstError = result.err.validationErrors[0]
        setError(firstError.msg + ": " + firstError.param)
        return
      }

    } catch (error) {
      console.log("show me an error !!!!")
    }
  }

  return (
    <div>
<<<<<<< HEAD
      <Button className="buttonDeleteAccount" variant="outlined" onClick={handleClickOpen}>
=======
      <Button className="buttonDeleteAccount" onClick={handleClickOpen}>
>>>>>>> 7252b32979a3cf2e69b35d45cdc13ebaab4b4d30
        Delete Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
            If you want to continue using this app you'll need to sign up again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No, go back</Button>
          <Button onClick={handleDelete} autoFocus className='killDog'>
            Yes, delete account
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}