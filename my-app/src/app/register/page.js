'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
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
        runDBCallAsync(`http://localhost:3000/api/register?name=${name}&email=${email}&pass=${pass}&tel=${tel}&eircode=${eircode}`)
    }; // end handle submit
    async function runDBCallAsync(url) {
        const res = await fetch(url);
        const data = await res;
        if(data.data== "valid"){
            console.log("login is valid!")
        } else {
            console.log("not valid ")
        }
    }
    return (
        <Container maxWidth="sm">
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
        </Container>
    ); // end return
}

