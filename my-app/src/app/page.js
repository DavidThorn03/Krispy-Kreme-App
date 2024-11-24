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
 
export default function MyApp() {
  const [errorMessage, setErrorMessage] = useState("");
 
    const handleSubmit = (event) => {
   	 
   	 console.log("handling submit");

	 event.preventDefault();
 
   	 const data = new FormData(event.currentTarget);

	let email = data.get('email')
   	let pass = data.get('pass')

	console.log("Sent email:" + email)
	console.log("Sent pass:" + pass)
	runDBCallAsync(`/api/login?email=${email}&pass=${pass}`)
  }; 

  async function runDBCallAsync(url, email) {
    const res = await fetch(url);
    const data = await res.json();
    if(data.length > 0){
      console.log("login is valid")
      await fetch (`/api/saveData?email=${data[0].email}&manager=${data[0].manager}`);
      if(data[0].manager){
        console.log("manager")
        window.location="/manager"
      }
      else{
      console.log("saved data")
      window.location="/products"
      }
    } else {
      console.log("not valid")
      setErrorMessage("Invalid login")
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
                        autoFocus
                        textcolor="white"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="pass"
                        label="Pass"
                        type="pass"
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




      </Box>
  );
}