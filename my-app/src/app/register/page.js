'use client';
'use client'
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
import { WindowOutlined } from '@mui/icons-material';

export default function Register() {
    const handleSubmit = (event) => {
        console.log("handling submit");
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let name = data.get('name')
        let email = data.get('email')
        email = email.toLowerCase()
        let pass = data.get('pass')
        let tel = data.get('tel')
        let eircode = data.get('eircode')
        console.log("Sent name:" + name)
        console.log("Sent email:" + email)
        console.log("Sent pass:" + pass)
        console.log("Sent tel:" + tel)
        console.log("Sent eircode:" + eircode)
        runDBCallAsync(`/api/register?name=${name}&email=${email}&pass=${pass}&tel=${tel}&eircode=${eircode}`, email)
    }; // end handle submit
    async function runDBCallAsync(url, email) {
        const res = await fetch(url);
        const data = await res.json();
        if(data.data == "valid"){
            let manager = false;
            console.log("register is valid!")
            fetch(`/api/saveData?email=${email}&manager=${manager}`)
            window.location="/products"
        } else {
            console.log("not valid")
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
            <Link href="/register">Register</Link> - 
            <Link href="/">Login</Link>
          </Toolbar>
        </AppBar>
            <Box sx={{ height: '100vh' }} >
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        autoComplete="name"
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
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="pass"
                        label="Password"
                        type="pass"
                        id="pass"
                        autoComplete="current-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="eircode"
                        label="Eircode"
                        name="eircode"
                        autoComplete="current-eircode"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="tel"
                        label="Telephone number"
                        name="tel"
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
        </Box>
    ); // end return
}

