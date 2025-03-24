'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Link from 'next/link'
import {useState} from 'react';
import { WindowOutlined } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import escapeHTML from 'escape-html';

export default function Register() {
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
        let name = escapeHTML(data.get('name'))
        let eircode = escapeHTML(data.get('eircode'))
        let tel = escapeHTML(data.get('tel'))

        console.log("Sent email:" + email)
        console.log("Sent pass:" + pass)
        console.log("Sent name:" + name)
        console.log("Sent eircode:" + eircode)
        console.log("Sent tel:" + tel)
        console.log("calling db");
        runDBCallAsync(`https://rich-web-assignment.vercel.app/api/register?email=${email}&pass=${pass}&name=${name}&eircode=${eircode}&tel=${tel}`, email);
      }
  }; 
    async function runDBCallAsync(url, email) {
        const res = await fetch(url);
        const data = await res.json();
        if(data.data == "valid"){
            let manager = false;
            console.log("register is valid!")
            fetch(`https://rich-web-assignment.vercel.app/api/saveData?email=${email}&manager=${manager}`)
            window.location="/products"
        } else {
            console.log("not valid")
        }
    }
    const validateForm = (event) => {
        let errorMessage = '';
        const data = new FormData(event.currentTarget);
        let email = data.get('email')
        let pass = data.get('pass')
        let name = data.get('name')
        let eircode = data.get('eircode')
        let tel = data.get('tel')
        if(!email || email.trim().length === 0){
            errorMessage += 'Email is required';
        }
        else if(!pass || pass.trim().length === 0){
            errorMessage += 'Password is required';
        }
        else if(!name || name.trim().length === 0){
            errorMessage += 'Name is required';
        }
        else if(!eircode || eircode.trim().length === 0){
            errorMessage += 'Eircode is required';
        }
        else if(!tel || tel.trim().length === 0){
            errorMessage += 'Telephone number is required';
        }
        else if(tel > 9999999999){
            errorMessage += 'Telephone number is too long';
        }
        else {
            var validator = require("email-validator");
            let emailCheck = validator.validate(email);
            console.log("email status" + emailCheck);
            if(emailCheck == false){
                errorMessage += 'Incorrect email';
            }
        }
        return errorMessage;
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
            <Box sx={{ height: '100vh' }} >
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{width: '34%', marginLeft: "33%"}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        autoComplete="name"
                        inputProps={{ maxLength: 40 }}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        inputProps={{ maxLength: 40 }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="pass"
                        label="Password"
                        type="password"
                        id="pass"
                        autoComplete="current-password"
                        inputProps={{ maxLength: 40 }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="eircode"
                        label="Eircode"
                        name="eircode"
                        autoComplete="current-eircode"
                        inputProps={{ maxLength: 7 }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="tel"
                        label="Telephone number"
                        name="tel"
                        type="number"
                        autoComplete="current-tel"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
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

