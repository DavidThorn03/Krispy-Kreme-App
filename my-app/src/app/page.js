'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Link from 'next/link'
import { WindowOutlined } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import escapeHTML from 'escape-html';

 
export default function MyApp() {
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [errorHolder, setErrorHolder] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  const handleSubmit = (event) => {

    console.log("handling submit");

    event.preventDefault();

    let errorMessage = validateForm(event);
    setErrorHolder(errorMessage)

    if(errorMessage.length > 0){
      handleClickOpen();
    } else {
        const data = new FormData(event.currentTarget);

        let email = escapeHTML(data.get('email'))
        let pass = escapeHTML(data.get('pass'))

        console.log("Sent email:" + email)
        console.log("Sent pass:" + pass)
        console.log("calling db");
        runDBCallAsync(`https://rich-web-assignment.vercel.app/api/login?email=${email}&pass=${pass}`)
      }
  }; 

  const validateForm = (event) => {
    let errorMessage = '';
    const data = new FormData(event.currentTarget);
    let email = data.get('email')
    let pass = data.get('pass')
    if(!email || email.trim().length === 0){
      errorMessage += 'Email is required';
    }
    else if(!pass || pass.trim().length === 0){
      errorMessage += 'Password is required';
    }
    else {
      console.log("email:" + email)
      var validator = require("email-validator");
      let emailCheck = validator.validate(email);
      console.log("email status" + emailCheck);
      if(emailCheck == false){
        errorMessage += 'Incorrect email';
      }
    }
    return errorMessage;
  }

  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();
    if(data.data == "invalid"){ 
      console.log("not valid")
      setErrorHolder("Invalid login")
      handleClickOpen();
    }
    else{
      console.log("login is valid")
      await fetch (`https://rich-web-assignment.vercel.app/api/saveData?email=${data[0].email}&manager=${data[0].manager}`);
      if(data[0].manager){
        console.log("manager")
        window.location="/manager"
      }
      else{
      console.log("saved data")
      window.location="/products"
      }
    }
  }

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Krispy Kreme
            </Typography>
            <Link href="/register" style={{padding: 10}}>Register</Link>
            <Link href="/" style={{padding: 10}}>Login</Link>
          </Toolbar>
        </AppBar>


        <Box component="form" sx={{width: '34%', marginLeft: "33%"}}onSubmit={handleSubmit} noValidate >
            
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        type="email"
                        inputProps={{ maxLength: 40 }}
                        autoFocus
                        textcolor="white"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="pass"
                        label="Password"
                        type="password"
                        inputProps={{ maxLength: 40 }}

                        id="pass"
                        autoComplete="current-password"
                    />


        <Button
        	type="submit"
        	fullWidth
        	variant="contained"
        	sx={{ mt: 3, mb: 2 }}
      	>
       	Log in
      	</Button>
        {errorMessage && (
          <Typography variant="body1" color="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}
        </Box>

      <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Error"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {errorHolder}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
  
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
      </Box>
  );
}